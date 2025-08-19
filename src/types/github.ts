// src/types/github.ts

export type ContributionDay = {
  date: string; // ISO date string
  contributionCount: number;
  color: string; // GitHub returns hex like "#9be9a8"
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
  colors?: string[]; // optional legend shades
};
