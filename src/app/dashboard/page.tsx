import { getContributions } from "./actions/getContributions";
import ContributionGraph from "./components/ContributionGraph";

export default async function Page() {
  const calendar = await getContributions();
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <ContributionGraph calendar={calendar} />
    </div>
  );
}
