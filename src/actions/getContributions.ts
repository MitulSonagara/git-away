"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function getContributions() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  const account = await prisma.account.findFirst({
    where: {
      user: { email: session.user.email },
      provider: "github",
    },
    select: { access_token: true },
  });

  if (!account?.access_token) {
    return null;
  }

  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            colors
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${account.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.data.viewer.contributionsCollection.contributionCalendar;
}
