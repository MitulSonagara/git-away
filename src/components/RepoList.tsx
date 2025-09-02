import { RepoCardControls } from "@/components/RepoCardControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUpdatedAt } from "@/lib/utils";
import { Clock, ExternalLink, GitBranch, GitFork, Star } from "lucide-react";
import Link from "next/link";
import FileBrowserModal from "./FileBrowserModal";
import { getConnectedRepos } from "@/actions/getConnectedRepos";

const dummyResult = {
  success: true,
  repos: [
    {
      id: "cmesh7a180001gkihwai103ai",
      userId: "cmemj3d6q0000gkhp5jqcez0u",
      externalRepoId: "R_kgDOPiU48w",
      active: false,
      github: {
        id: "R_kgDOPiU48w",
        name: "test-repo",
        nameWithOwner: "MitulSonagara/test-repo",
        description: null,
        isPrivate: true,
        stargazerCount: 1,
        forkCount: 0,
        updatedAt: "2025-08-29T05:10:03Z",
        url: "https://github.com/MitulSonagara/test-repo",
        primaryLanguage: null,
        owner: {
          login: "MitulSonagara",
          avatarUrl:
            "https://avatars.githubusercontent.com/u/95460188?u=bf835d20588276254f8a246ebee960910e706a47&v=4",
        },
      },
    },
    {
      id: "cmewmjydg0001gke50tyxwjb6",
      userId: "cmemj3d6q0000gkhp5jqcez0u",
      externalRepoId: "R_kgDOPX9Bug",
      active: false,
      github: {
        id: "R_kgDOPX9Bug",
        name: "git-away",
        nameWithOwner: "MitulSonagara/git-away",
        description: null,
        isPrivate: true,
        stargazerCount: 0,
        forkCount: 0,
        updatedAt: "2025-08-26T11:43:01Z",
        url: "https://github.com/MitulSonagara/git-away",
        primaryLanguage: { name: "TypeScript", color: "#3178c6" },
        owner: {
          login: "MitulSonagara",
          avatarUrl:
            "https://avatars.githubusercontent.com/u/95460188?u=bf835d20588276254f8a246ebee960910e706a47&v=4",
        },
      },
    },
  ],
};

const RepoList = async () => {
  const result = await getConnectedRepos();

  // const result = await new Promise<typeof dummyResult>((resolve) =>
  //   setTimeout(() => resolve(dummyResult), 10000)
  // );

  if (!result.success) {
    return <div className="text-center text-red-500"></div>;
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
            <div className="flex-1 items-start justify-between">
              <div className="flex justify-between">
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

                <RepoCardControls repo={repo} />
              </div>

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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RepoList;
