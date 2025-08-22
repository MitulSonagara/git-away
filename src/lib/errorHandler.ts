import { RequestError } from "octokit";

export function handleGitHubError(error: RequestError, context: string) {
  console.error(`[${context}]`, {
    status: error?.status,
    message: error?.message,
    stack: error?.stack,
    response: error?.response?.data,
  });

  switch (error?.status) {
    case 401:
      return "GitHub token invalid or expired";
    case 403:
      return "No permission to access repository";
    case 404:
      return "Repository or file not found";
    case 409:
      return "File has been updated, please retry";
    case 429:
      return "GitHub rate limit exceeded, please try later";
    default:
      return "Unexpected error, please try again";
  }
}
