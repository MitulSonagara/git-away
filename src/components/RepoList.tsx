import { getConnectedRepos } from "@/actions/getConnectedRepos";
import { formatUpdatedAt } from "@/lib/utils";
import { Clock, ExternalLink, GitBranch, GitFork, Star } from "lucide-react";
import Link from "next/link";
import { RepoCardControls } from "@/components/RepoCardControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const RepoList = async () => {
  const result = await getConnectedRepos();

  if (!result.success) {
    return (
      <div className="text-center text-red-500">
        Error loading repositories: {result.error}
      </div>
    );
  }

  if (result.repos?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No repositories connected yet
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Connect your first repository to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {result.repos?.map((repo) => (
        <Card key={repo.id} className="bg-card/20 py-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <GitBranch className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{repo.github?.name}</span>
                      {repo.github?.isPrivate && (
                        <Badge variant="outline" className="text-xs">
                          Private
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {repo.github?.nameWithOwner}
                    </div>
                  </div>
                  {repo.github?.url && (
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={repo.github.url}>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.github?.stargazerCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repo.github?.forkCount}
                  </div>
                  {repo.github?.primaryLanguage && (
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{
                          backgroundColor:
                            repo.github?.primaryLanguage?.color || "#ccc",
                        }}
                      ></div>
                      {repo.github?.primaryLanguage?.name}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {repo.github?.updatedAt
                      ? formatUpdatedAt(repo.github.updatedAt)
                      : "N/A"}
                  </div>
                </div>
              </div>
              <Switch />

              {/* Controls */}
              <RepoCardControls active={repo.active} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RepoList;
