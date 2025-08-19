"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function getContributions() {
  const session = await auth();
  if (!session?.user?.email) {
    return null; // not logged in
  }

  // get the user's GitHub access token from Account table
  const account = await prisma.account.findFirst({
    where: {
      user: { email: session.user.email },
      provider: "github",
    },
    select: { access_token: true },
  });

  if (!account?.access_token) {
    return null; // GitHub not linked
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
    return null; // fail silently instead of breaking dashboard
  }

  const data = await res.json();
  return data.data.viewer.contributionsCollection.contributionCalendar;
}
