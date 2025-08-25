import ContributionGraph from "../components/ContributionGraph";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import StateCards from "../components/StateCards";
import VacationBanner from "../components/VacationBanner";
import { Suspense } from "react";
import { VacationBannerSkeleton } from "@/components/skeleton/VacationBannerSkeleton";
import QuickActionsSkeleton from "@/components/skeleton/QuickActionsSkeleton";
import { StateCardsSkeleton } from "@/components/skeleton/StateCardsSkeleton";
import { ContributionGraphSkeleton } from "@/components/skeleton/ContributionGraphSkeleton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <Suspense fallback={<VacationBannerSkeleton />}>
        <VacationBanner />
      </Suspense>
      <Suspense fallback={<QuickActionsSkeleton />}>
        <QuickActions />
      </Suspense>
      <Suspense fallback={<StateCardsSkeleton />}>
        <StateCards />
      </Suspense>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Suspense fallback={<ContributionGraphSkeleton />}>
            <ContributionGraph />
          </Suspense>
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
