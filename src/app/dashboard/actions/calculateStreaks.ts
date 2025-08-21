import { ContributionCalendar } from "@/types/github";

export function calculateStreaks(calendar: ContributionCalendar) {
  const days = calendar.weeks.flatMap((w) => w.contributionDays);
  let longest = 0;
  let temp = 0;
  for (const day of days) {
    if (day.contributionCount > 0) {
      temp++;
      longest = Math.max(longest, temp);
    } else {
      temp = 0;
    }
  }

  let current = 0;
  for (let i = days.length - 2; i >= 0; i--) {
    const { contributionCount } = days[i];

    if (contributionCount > 0) {
      current++;
    } else {
      // Stop streak as soon as we hit a gap
      break;
    }
  }
  return { currentStreak: current, longestStreak: longest };
}
