import { getContributions } from "./actions/getContributions";
import { getVacationStatus } from "./actions/getVacationStatus";
import ContributionGraph from "./components/ContributionGraph";
import VacationBanner from "./components/VacationBanner";

export default async function Page() {
  const calendar = await getContributions();
  const { name, isVacationActive } = await getVacationStatus();
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <VacationBanner userName={name} isVacationActive={isVacationActive} />
      <ContributionGraph calendar={calendar} />
    </div>
  );
}
