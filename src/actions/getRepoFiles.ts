"use server";

import { auth } from "@/lib/auth"; // Adjust import path as needed
import { prisma } from "@/lib/prisma"; // Adjust import path as needed

interface RepoFile {
  sha: string;
  path: string;
}

interface GetRepoFilesResult {
  success: boolean;
  files?: RepoFile[];
  error?: string;
}

export async function getRepoFiles(repoId: string): Promise<GetRepoFilesResult> {
  try {
    // Get the current user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required"
      };
    }
    
    const repoFiles = await prisma.repoFile.findMany({
      where: {
        repoId: repoId
      },
      select: {
        sha: true,
        path: true
      }
    });

    return {
      success: true,
      files: repoFiles
    };

  } catch (error) {
    console.error("Error fetching repo files:", error);
    
    return {
      success: false,
      error: "Failed to fetch repository files"
    };
  }
}