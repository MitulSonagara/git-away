"use server";

import { auth } from "@/lib/auth";
import { handleGitHubError } from "@/lib/errorHandler";
import { Octokit, RequestError } from "octokit";

export interface GitHubRepo {
  id: string;
  name: string;
  isPrivate: boolean;
  description: string | null;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt: string;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface GitHubRepositoriesResponse {
  viewer: {
    repositories: {
      nodes: GitHubRepo[];
      pageInfo: PageInfo;
    };
  };
}

interface GetReposParams {
  first?: number;
  after?: string | null;
  last?: number;
  before?: string | null;
}

interface GetReposResult {
  success: boolean;
  repos?: GitHubRepo[];
  pageInfo?: PageInfo;
  error?: string;
}

export async function getRepos({
  first,
  after,
  last,
  before,
}: GetReposParams): Promise<GetReposResult> {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      console.error("Auth failed:", session);
      return { success: false, error: "Not authenticated" };
    }

    if ((first && last) || (!first && !last)) {
      return {
        success: false,
        error: "Must specify either 'first' or 'last', but not both",
      };
    }

    if (first && first > 100) {
      return {
        success: false,
        error: "Maximum 'first' value is 100",
      };
    }

    const octokit = new Octokit({ auth: session.accessToken });

    const query = `
      query GetRepositories($first: Int, $after: String, $last: Int, $before: String) {
        viewer {
          repositories(
            first: $first
            after: $after
            last: $last
            before: $before
            affiliations: OWNER
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              id
              name
              isPrivate
              description
              primaryLanguage {
                name
                color
              }
              updatedAt
            }
            pageInfo {
              hasPreviousPage
              hasNextPage
              endCursor
              startCursor
            }
          }
        }
      }
    `;

    const response = await octokit.graphql<GitHubRepositoriesResponse>(query, {
      first,
      after,
      last,
      before,
    });

    return {
      success: true,
      repos: response.viewer.repositories.nodes,
      pageInfo: response.viewer.repositories.pageInfo,
    };
  } catch (error) {
    if (error instanceof RequestError) {
      const errorMessage = handleGitHubError(error, "getRepos");
      return {
        success: false,
        error: errorMessage,
      };
    }

    console.error("Error fetching repositories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
