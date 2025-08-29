"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GitHubRepo } from "./getRepos";

export async function saveUserRepos(selectedRepoIds: string[]) {
  const session = await auth();
  if (!session?.user?.email || !session?.user?.id)
    throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  for (const repoId of selectedRepoIds) {
    await prisma.repo.upsert({
      where: {
        userId_externalRepoId: {
          userId: session.user.id,
          externalRepoId: repoId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        externalRepoId: repoId,
      },
    });
  }

  return { success: true };
}
