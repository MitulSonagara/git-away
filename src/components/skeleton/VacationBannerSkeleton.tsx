import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VacationBannerSkeleton() {
  return (
    <Card className="py-0 bg-card/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            {/* Fake heading */}
            <Skeleton className="h-6 w-48 rounded-md" />
            {/* Fake paragraph */}
            <Skeleton className="h-4 w-80 rounded-md" />
          </div>
          {/* Fake emoji */}
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
