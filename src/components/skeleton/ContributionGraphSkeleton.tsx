import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ContributionGraphSkeleton() {
  return (
    <Card className="gap-4 bg-card/20">
      <CardHeader>
        <CardTitle className="text-xl">Your Contributions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Fake grid */}
        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-53">
            {Array.from({ length: 53 }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[4px]">
                {Array.from({ length: 7 }).map((_, dayIdx) => (
                  <Skeleton
                    key={dayIdx}
                    className="w-3 h-3 rounded-[3px]"
                  />
                ))}
              </div>  
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-8" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-3 h-3 rounded-[3px]"
                />
              ))}
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
