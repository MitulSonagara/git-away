import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StateCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="bg-card/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            {/* Fake title */}
            <Skeleton className="h-5 w-28 rounded-md" />
            {/* Fake icon */}
            <Skeleton className="h-6 w-6 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Fake number */}
            <Skeleton className="h-7 w-12 rounded-md" />
            {/* Fake subtitle */}
            <Skeleton className="h-4 w-32 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
