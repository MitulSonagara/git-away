import ConnectRepoModal from "@/components/ConnectRepoModal";
import RepoList from "@/components/RepoList";
import RepoListSkeleton from "@/components/skeleton/RepoListSkeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Connected Repositories</h1>
          <p className="text-muted-foreground">
            Manage which repositories GitAway can schedule commits for
          </p>
        </div>
        <div className="flex gap-2">
          <ConnectRepoModal />
          <Button variant="outline">
            <Plus className="w-4 h-4" />
            Create Repo
          </Button>
        </div>
      </div>

      <Suspense fallback={<RepoListSkeleton />}>
        <RepoList />
      </Suspense>
    </div>
  );
}
