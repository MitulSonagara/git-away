"use server";

import { auth } from "@/lib/auth";
import { handleGitHubError } from "@/lib/errorHandler";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { Octokit, RequestError } from "octokit";

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

interface GetRepoContentResult {
  success: boolean;
  contents?: GitHubContent[];
  error?: string;
}

interface CheckRepoSettingsResult {
  success: boolean;
  hasFiles?: boolean;
  error?: string;
}

interface ToggleRepoActiveResult {
  success: boolean;
  error?: string;
}

interface SaveRepoFilesResult {
  success: boolean;
  error?: string;
}
async function fetchRepoContentFromGitHub(
  accessToken: string,
  nameWithOwner: string,
  path: string
): Promise<GitHubContent[]> {
  const [owner, repoName] = nameWithOwner.split("/");
  const octokit = new Octokit({ auth: accessToken });

  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo: repoName,
    path,
  });

  const contents = Array.isArray(data) ? data : [data];

  return contents.filter(
    (item) =>
      item &&
      typeof item === "object" &&
      "name" in item &&
      "type" in item &&
      "sha" in item
  ) as GitHubContent[];
}

function makeCachedRepoContent(nameWithOwner: string, path: string) {
  return unstable_cache(
    async (accessToken: string) => {
      return fetchRepoContentFromGitHub(accessToken, nameWithOwner, path);
    },
    // key must be static here, but we can bake repo+path into it
    [`repo-content:${nameWithOwner}:${path}`],
    {
      revalidate: 300,
      tags: ["github-content"],
    }
  );
}

export async function getRepoContent(
  nameWithOwner: string,
  path: string = ""
): Promise<GetRepoContentResult> {
  try {
    const session = await auth();
    if (!session?.accessToken || !session.user?.username) {
      return { success: false, error: "Not authenticated" };
    }

    const getCachedRepoContent = makeCachedRepoContent(nameWithOwner, path);

    const contents = await getCachedRepoContent(session.accessToken);

    return {
      success: true,
      contents,
    };
  } catch (error) {
    if (error instanceof RequestError) {
      return {
        success: false,
        error: handleGitHubError(error, "getRepoContent"),
      };
    }

    console.error("Error fetching repo content:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function checkRepoSettings(
  repoId: string
): Promise<CheckRepoSettingsResult> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const repo = await prisma.repo.findFirst({
      where: {
        id: repoId,
        userId: session.user.id,
      },
      include: {
        selectedFiles: true,
      },
    });

    return {
      success: true,
      hasFiles: repo ? repo.selectedFiles.length > 0 : false,
    };
  } catch (error) {
    console.error("Error checking repo settings:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to check repo settings",
    };
  }
}

export async function toggleRepoActive(
  repoId: string,
  active: boolean
): Promise<ToggleRepoActiveResult> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await prisma.repo.update({
      where: {
        id: repoId,
        userId: session.user.id, // Ensure user owns the repo
      },
      data: {
        active,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error toggling repo active status:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update repository",
    };
  }
}
