"use server";

import { Octokit, RequestError } from "octokit";
import { auth } from "@/lib/auth";
import { handleGitHubError } from "@/lib/errorHandler";

export async function emergencyCommit() {
  const session = await auth();

  if (
    !session?.accessToken ||
    !session.user ||
    !session.user?.username ||
    !session.user?.email
  ) {
    console.error("Auth failed:", session);
    return { success: false, error: "Not authenticated" };
  }

  const octokit = new Octokit({ auth: session.accessToken });

  let sha: string | undefined;
  let newContent = "Hello from next js";

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: session.user.username,
      path: "hello.txt",
      repo: "test-repo",
    });

    if (!Array.isArray(data) && data.sha && data.type == "file") {
      sha = data.sha;
      const existingContent = Buffer.from(data.content, "base64").toString(
        "utf8"
      );

      newContent = existingContent + "\nHello from next js 15";
    }
  } catch (error: unknown) {
    if (error instanceof Error && "status" in error) {
      return {
        success: false,
        error: handleGitHubError(error as RequestError, "getContent"),
      };
    }
    console.error("Unexpected error in getContent:", error);
    return { success: false, error: "Unexpected error, please try again" };
  }

  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: session.user.username,
      repo: "test-repo",
      path: "hello.txt",
      message: "Commit from GitAway",
      content: Buffer.from(newContent).toString("base64"),
      committer: {
        email: session.user.email,
        name: session.user.username,
      },
      author: {
        email: session.user.email,
        name: session.user.username,
      },
      sha,
    });

    return { success: true, message: "Emergency commit successful!" };
  } catch (error: unknown) {
    if (error instanceof Error && "status" in error) {
      return {
        success: false,
        error: handleGitHubError(error as RequestError, "commit"),
      };
    }
    console.error("Unexpected error in commit:", error);
    return { success: false, error: "Unexpected error, please try again" };
  }
}
