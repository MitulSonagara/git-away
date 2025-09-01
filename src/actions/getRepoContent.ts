"use server";

import { auth } from "@/lib/auth";
import { handleGitHubError } from "@/lib/errorHandler";
import { prisma } from "@/lib/prisma";
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

export async function getRepoContent(
  nameWithOwner: string,
  path: string = ""
): Promise<GetRepoContentResult> {
  try {
    const session = await auth();
    if (!session?.accessToken || !session.user?.username) {
      return { success: false, error: "Not authenticated" };
    }

    const [owner, repoName] = nameWithOwner.split("/");
    const octokit = new Octokit({ auth: session.accessToken });

    const { data } = await octokit.rest.repos.getContent({
      owner: owner || session.user.username,
      repo: repoName,
      path,
    });

    // Handle both single file and array responses
    const contents = Array.isArray(data) ? data : [data];

    // Filter out any items that don't have the expected structure
    const validContents = contents.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        "name" in item &&
        "type" in item &&
        "sha" in item
    ) as GitHubContent[];

    return {
      success: true,
      contents: validContents,
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

    // Check if repo belongs to user and if it has any files in settings

    const repo = await prisma.repo.findFirst({
      where: {
        externalRepoId: repoId,
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

// export async function saveRepoFiles(
//   repoId: string,
//   files: Array<{ sha: string; path: string }>
// ): Promise<SaveRepoFilesResult> {
//   try {
//     const session = await auth();
//     if (!session?.user?.id) {
//       return { success: false, error: "Not authenticated" };
//     }

//     await prisma.$transaction(async (tx) => {
//       // First, ensure repo settings exist
//       const repoSettings = await tx.repo.upsert({
//         where: { repoId },
//         update: {},
//         create: {
//           repoId,
//           // Add any default settings here
//         },
//       });

//       // Delete existing files for this repo
//       await tx.repoFile.deleteMany({
//         where: { repoSettingsId: repoSettings.id },
//       });

//       // Insert new files
//       if (files.length > 0) {
//         await tx.repoFile.createMany({
//           data: files.map((file) => ({
//             repoSettingsId: repoSettings.id,
//             filePath: file.path,
//             fileSha: file.sha,
//           })),
//         });
//       }

//       // Activate the repo
//       await tx.repo.update({
//         where: {
//           id: repoId,
//           userId: session.user.id,
//         },
//         data: {
//           active: true,
//         },
//       });
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error saving repo files:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Failed to save files",
//     };
//   }
// }
