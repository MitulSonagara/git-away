"use server";

import { auth } from "@/lib/auth"; // Adjust import path as needed
import { prisma } from "@/lib/prisma"; // Adjust import path as needed

interface FileData {
  sha: string;
  path: string;
}

interface SaveRepoFilesResult {
  success: boolean;
  error?: string;
  savedCount?: number;
}

export async function saveRepoFiles(
  repoId: string,
  files: FileData[]
): Promise<SaveRepoFilesResult> {
  try {
    // Get the current user session
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Verify that the repo belongs to the current user
    const repo = await prisma.repo.findFirst({
      where: {
        id: repoId,
        userId: session.user.id,
      },
    });

    if (!repo) {
      return {
        success: false,
        error: "Repository not found or access denied",
      };
    }

    // Validate input
    if (!files || files.length === 0) {
      return {
        success: false,
        error: "No files provided",
      };
    }

    // Validate file data structure
    const invalidFiles = files.filter(
      (file) =>
        !file.sha ||
        !file.path ||
        typeof file.sha !== "string" ||
        typeof file.path !== "string"
    );

    if (invalidFiles.length > 0) {
      return {
        success: false,
        error: "Invalid file data provided",
      };
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // First, delete existing files for this repo
      await tx.repoFile.deleteMany({
        where: {
          repoId: repoId,
        },
      });

      // Then insert the new files
      const repoFilesToCreate = files.map((file) => ({
        repoId: repoId,
        path: file.path,
        sha: file.sha,
      }));

      const createResult = await tx.repoFile.createMany({
        data: repoFilesToCreate,
        skipDuplicates: true, // In case of any duplicate paths
      });

      return createResult.count;
    });

    return {
      success: true,
      savedCount: result,
    };
  } catch (error) {
    console.error("Error saving repo files:", error);
    return {
      success: false,
      error: "Failed to save repository files",
    };
  }
}
