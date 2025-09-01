"use client";

import { ConnectedRepo } from "@/actions/getConnectedRepos";
import { getRepoContent } from "@/actions/getRepoContent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, File, Folder, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

interface FileBrowserModalProps {
  repo: ConnectedRepo;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function FileBrowserModal({ repo }: FileBrowserModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [contents, setContents] = useState<GitHubContent[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { name: "Root", path: "" },
  ]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open && repo.github) {
      loadContent("");
    }
  }, [open, repo.github]);

  const loadContent = async (path: string) => {
    if (!repo.github) return;

    setIsLoading(true);
    try {
      const result = await getRepoContent(repo.github.nameWithOwner, path);

      if (result.success && result.contents) {
        setContents(result.contents);
        setCurrentPath(path);
      } else {
        toast.error(result.error || "Failed to load repository content");
      }
    } catch (error) {
      toast.error("Failed to load repository content");
      console.error("Error loading content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToFolder = (folderPath: string, folderName: string) => {
    const newBreadcrumbs = [...breadcrumbs];
    const existingIndex = newBreadcrumbs.findIndex(
      (b) => b.path === folderPath
    );

    if (existingIndex !== -1) {
      setBreadcrumbs(newBreadcrumbs.slice(0, existingIndex + 1));
    } else {
      newBreadcrumbs.push({ name: folderName, path: folderPath });
      setBreadcrumbs(newBreadcrumbs);
    }

    loadContent(folderPath);
  };

  const toggleFileSelection = (sha: string, path: string) => {
    const newSelected = new Set(selectedFiles);
    const fileKey = `${sha}:${path}`;

    if (newSelected.has(fileKey)) {
      newSelected.delete(fileKey);
    } else {
      newSelected.add(fileKey);
    }
    setSelectedFiles(newSelected);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleSave = () => {
    if (selectedFiles.size === 0) {
      toast.error("Please select at least one file");
      return;
    }

    startTransition(async () => {
      try {
        const fileData = Array.from(selectedFiles).map((fileKey) => {
          const [sha, path] = fileKey.split(":");
          return { sha, path };
        });

        console.log("fileData: ", fileData);
        // Implement save logic here
      } catch (error) {
        toast.error("Failed to save files");
        console.error("Error saving files:", error);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(new Set());
    setBreadcrumbs([{ name: "Root", path: "" }]);
    setCurrentPath("");
    setContents([]);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>o</Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
            <DialogTitle className="text-lg">
              Select Files from {repo.github?.nameWithOwner}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Choose files for GitAway to monitor
            </p>
          </DialogHeader>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-2 border-b flex-shrink-0">
              <ScrollArea className="whitespace-nowrap w-full">
                <div className="flex items-center gap-1">
                  {breadcrumbs.map((crumb, index) => (
                    <div
                      key={crumb.path}
                      className="flex items-center flex-shrink-0"
                    >
                      {index > 0 && (
                        <ChevronLeft className="w-3 h-3 mx-1 text-muted-foreground" />
                      )}
                      <Button
                        variant="link"
                        size="sm"
                        className="text-xs p-0 whitespace-nowrap"
                        onClick={() => {
                          if (index < breadcrumbs.length - 1) {
                            setBreadcrumbs(breadcrumbs.slice(0, index + 1));
                            loadContent(crumb.path);
                          }
                        }}
                        disabled={index === breadcrumbs.length - 1}
                      >
                        {crumb.name}
                      </Button>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* File List Container with Fixed Height */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="p-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span className="text-sm">Loading...</span>
                    </div>
                  ) : contents.length === 0 ? (
                    <div className="text-center py-12 text-sm text-muted-foreground">
                      This folder is empty
                    </div>
                  ) : (
                    <div>

                      {/* Folders */}
                      {contents
                        .filter((item) => item.type === "dir")
                        .map((item) => (
                          <div
                            key={item.path}
                            className="grid grid-cols-12 gap-4 px-4 py-1.5 hover:bg-accent/50 cursor-pointer border-b border-border/30 text-sm"
                            onClick={() =>
                              navigateToFolder(item.path, item.name)
                            }
                          >
                            <div className="col-span-1"></div>
                            <div className="col-span-1 flex items-center">
                              <Folder className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="col-span-7 flex items-center font-medium">
                              {item.name}
                            </div>
                            <div className="col-span-3 text-right text-muted-foreground text-xs flex items-center justify-end">
                              —
                            </div>
                          </div>
                        ))}

                      {/* Files */}
                      {contents
                        .filter((item) => item.type === "file")
                        .map((item) => {
                          const fileKey = `${item.sha}:${item.path}`;
                          const isSelected = selectedFiles.has(fileKey);

                          return (
                            <div
                              key={item.path}
                              className={`grid grid-cols-12 gap-4 px-4 py-1.5 cursor-pointer border-b border-border/30 text-sm transition-colors ${
                                isSelected
                                  ? "bg-primary/10 hover:bg-primary/15"
                                  : "hover:bg-accent/50"
                              }`}
                              onClick={() =>
                                toggleFileSelection(item.sha, item.path)
                              }
                            >
                              <div className="col-span-1 flex items-center">
                                <Checkbox
                                  checked={isSelected}
                                  className="h-4 w-4"
                                />
                              </div>
                              <div className="col-span-1 flex items-center">
                                <File className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div className="col-span-7 flex items-center truncate">
                                {item.name}
                              </div>
                              <div className="col-span-3 text-right text-muted-foreground text-xs flex items-center justify-end">
                                {formatFileSize(item.size)}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Selected Files Summary */}
          {selectedFiles.size > 0 && (
            <div className="border-t bg-muted/30 p-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {selectedFiles.size} file{selectedFiles.size !== 1 ? "s" : ""}{" "}
                  selected
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => setSelectedFiles(new Set())}
                >
                  Clear all
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                {Array.from(selectedFiles)
                  .slice(0, 10)
                  .map((fileKey) => {
                    const [, path] = fileKey.split(":");
                    return (
                      <span
                        key={fileKey}
                        className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                      >
                        {path.split("/").pop()}
                      </span>
                    );
                  })}
                {selectedFiles.size > 10 && (
                  <span className="text-xs text-muted-foreground px-2 py-0.5">
                    +{selectedFiles.size - 10} more
                  </span>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="px-6 py-4 border-t gap-2 flex-shrink-0">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={selectedFiles.size === 0 || isPending}
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Selection ({selectedFiles.size})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
