"use client";
import { getRepos, GitHubRepo, PageInfo } from "@/actions/getRepos";
import { saveUserRepos } from "@/actions/saveUserRepos";
import { Loader2, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

const ConnectRepoModal = () => {
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
  });
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.IDLE
  );

  const selectedCount = useMemo(() => selected.size, [selected]);

  const loadRepos = useCallback(
    async (cursor: string | null, direction: "next" | "prev" = "next") => {
      setLoadingState(LoadingState.LOADING);

      try {
        const params =
          direction === "next"
            ? { first: 20, after: cursor }
            : { last: 20, before: cursor };

        const res = await getRepos(params);

        if (res.success && res.repos && res.pageInfo) {
          setRepos(res.repos);
          setPageInfo(res.pageInfo);
          setLoadingState(LoadingState.IDLE);
        } else {
          throw new Error(res.error || "Failed to load repositories");
        }
      } catch (err) {
        console.error("Error loading repos:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load repositories";

        toast.error("Error loading repositories");

        setLoadingState(LoadingState.ERROR);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (open) {
      loadRepos(null);
    }
  }, [open, loadRepos]);

  useEffect(() => {
    if (!open) {
      setSelected(new Set());
      setRepos([]);
      setLoadingState(LoadingState.IDLE);
    }
  }, [open]);

  const toggleSelect = useCallback((repoId: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (selectedCount === 0) return;

    try {
      await saveUserRepos([...selected]);
      console.log(selected);
      toast.success("Repositories connected");

      setOpen(false);
    } catch (err) {
      console.error("Error saving repositories:", err);

      toast.error("Error connecting repositories");
    }
  }, [selected, selectedCount, toast]);

  const handlePrevious = useCallback(() => {
    loadRepos(pageInfo.startCursor, "prev");
  }, [loadRepos, pageInfo.startCursor]);

  const handleNext = useCallback(() => {
    loadRepos(pageInfo.endCursor, "next");
  }, [loadRepos, pageInfo.endCursor]);

  const isLoading = loadingState === LoadingState.LOADING;

  return (
    <>
      <Button variant="default" onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Connect Repo
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Repositories</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-2 max-h-80 h-80 overflow-y-auto">
              {repos.length === 0 && loadingState === LoadingState.ERROR ? (
                <div className="flex justify-center items-center h-full text-muted-foreground">
                  Failed to load repositories
                </div>
              ) : repos.length === 0 ? (
                <div className="flex justify-center items-center h-full text-muted-foreground">
                  No repositories found
                </div>
              ) : (
                repos.map((repo) => {
                  const isSelected = selected.has(repo.id);

                  return (
                    <div
                      key={repo.id}
                      className={`flex items-start space-x-3 p-3 border rounded-lg transition-colors ${
                        isSelected
                          ? "bg-primary/5 border-primary"
                          : "hover:bg-muted/50"
                      } cursor-pointer`}
                      onClick={() => toggleSelect(repo.id)}
                    >
                      <Checkbox checked={isSelected} className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{repo.name}</p>
                          {repo.isPrivate && (
                            <Badge variant={"secondary"}>Private</Badge>
                          )}
                          {repo.primaryLanguage && (
                            <Badge variant={"outline"}>
                              {" "}
                              {repo.primaryLanguage && (
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{
                                    backgroundColor: repo.primaryLanguage.color,
                                  }}
                                />
                              )}
                              {repo.primaryLanguage.name}
                            </Badge>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated {new Date(repo.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={!pageInfo?.hasPreviousPage || isLoading}
              onClick={handlePrevious}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>

            <Button
              disabled={!pageInfo?.hasNextPage || isLoading}
              onClick={handleNext}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={selectedCount === 0 || isLoading}
            >
              Connect {selectedCount > 0 && `(${selectedCount})`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConnectRepoModal;
