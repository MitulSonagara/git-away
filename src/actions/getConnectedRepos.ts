"use server";

import { auth } from "@/lib/auth";
import { handleGitHubError } from "@/lib/errorHandler";
import { prisma } from "@/lib/prisma";
import { Octokit, RequestError } from "octokit";

interface RepoQueryResponse {
  node: NonNullable<ConnectedRepo["github"]>;
}

export interface ConnectedRepo {
  id: string; // local DB id
  userId: string;
  externalRepoId: string; // GitHub node_id
  active: boolean;
  github: {
    id: string;
    name: string;
    nameWithOwner: string;
    isPrivate: boolean;
    description: string | null;
    stargazerCount: number;
    forkCount: number;
    updatedAt: string;
    primaryLanguage: {
      name: string;
      color: string;
    } | null;
    owner: {
      login: string;
      avatarUrl: string;
    };
    url: string;
  } | null;
}

interface GetConnectedReposResult {
  success: boolean;
  repos?: ConnectedRepo[];
  error?: string;
}

export async function getConnectedRepos(): Promise<GetConnectedReposResult> {
  try {
    const session = await auth();

    if (!session?.accessToken || !session.user?.id) {
      console.error("Auth failed:", session);
      return { success: false, error: "Not Authenicated" };
    }

    const repos = await prisma.repo.findMany({
      where: { user: { id: session.user.id } },
    });

    if (!repos.length) return { success: true, repos: [] };

    const octokit = new Octokit({ auth: session.accessToken });

    const query = `
      query ($repoId: ID!) {
        node(id: $repoId) {
          ... on Repository {
            id
            name
            nameWithOwner
            description
            isPrivate
            stargazerCount
            forkCount
            updatedAt
            url
            primaryLanguage {
              name
              color
            }
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    `;

    const repoDetails = await Promise.all(
      repos.map(async (repo) => {
        try {
          const response = await octokit.graphql<RepoQueryResponse>(query, {
            repoId: repo.externalRepoId,
          });
          return {
            ...repo,
            github: response.node,
          } as ConnectedRepo;
        } catch (error) {
          console.error(`Failed to fetch repo ${repo.externalRepoId}:`, error);
          return {
            ...repo,
            github: null,
          } as ConnectedRepo;
        }
      }),
    );
    // await new Promise((resolve) => setTimeout(resolve, 100000))
    return { success: true, repos: repoDetails };
  } catch (error) {
    if (error instanceof RequestError) {
      return {
        success: false,
        error: handleGitHubError(error, "getConnectedRepos"),
      };
    }

    console.error("Error fetching connected repos:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
