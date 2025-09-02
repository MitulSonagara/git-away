"use client";

import { ConnectedRepo } from "@/actions/getConnectedRepos";
import { toggleRepoActive } from "@/actions/getRepoContent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import FileBrowserModal from "./FileBrowserModal";

interface RepoCardControlsProps {
  repo: ConnectedRepo;
}

export const RepoCardControls = ({ repo }: RepoCardControlsProps) => {
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(repo.active);
  const [showFileBrowser, setShowFileBrowser] = useState(false);

  const handleToggleActive = async (checked: boolean) => {
    if (!repo.github) {
      toast.error("Repository data is not available");
      return;
    }

    if (checked) {
      setShowFileBrowser(true);
    } else {
      // async deactivate with transition
      startTransition(async () => {
        try {
          const result = await toggleRepoActive(repo.id, false);
          if (result.success) {
            setIsActive(false);
            toast.success(
              `Repository deactivated successfully`
            );
          } else {
            toast.error(result.error || "Failed to update repository status");
          }
        } catch (error) {
          toast.error("An unexpected error occurred");
          console.error("Error toggling repo:", error);
        }
      });
    }
  };

  const handleFilesSelected = async () => {
    setShowFileBrowser(false);
    const result = await toggleRepoActive(repo.id, true);
    if (result.success) {
      setIsActive(true);
      toast.success(`Repository activated with selected files!`);
    } else {
      toast.error(result.error || "Failed to update repository status");
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 ml-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isActive ? "Connected" : "Disconnected"}
          </span>
          <Switch
            checked={isActive}
            onCheckedChange={handleToggleActive}
            disabled={isPending}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowFileBrowser(true)}
          disabled={!isActive}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      <FileBrowserModal
        repo={repo}
        open={showFileBrowser}
        onOpenChange={setShowFileBrowser}
        onFilesSelected={handleFilesSelected}
      />
    </>
  );
};
