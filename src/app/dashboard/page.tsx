import { calculateStreaks } from "./actions/calculateStreaks";
import { getContributions } from "./actions/getContributions";
import { getVacationStatus } from "./actions/getVacationStatus";
import ContributionGraph from "./components/ContributionGraph";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import StateCards from "./components/StateCards";
import VacationBanner from "./components/VacationBanner";

export default async function Page() {
  const contributionCalendar = await getContributions();
  const { name, isVacationActive } = await getVacationStatus();

  const { currentStreak, longestStreak } =
    calculateStreaks(contributionCalendar);
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <VacationBanner userName={name} isVacationActive={isVacationActive} />
      <QuickActions />
      <StateCards currentStreak={currentStreak} longestStreak={longestStreak} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <ContributionGraph calendar={contributionCalendar} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
