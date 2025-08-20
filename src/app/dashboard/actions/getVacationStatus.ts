"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getVacationStatus() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      scheduledJobs: {
        where: {
          status: { in: ["SCHEDULED", "RUNNING"] },
          nextRunAt: { gte: new Date() },
        },
        take: 1, // we only need to know if any exist
      },
    },
  });

  if (!user) throw new Error("User not found");

  return {
    name: user.name ?? "Developer",
    isVacationActive: user.scheduledJobs.length > 0,
  };
}
