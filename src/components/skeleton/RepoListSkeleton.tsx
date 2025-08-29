import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RepoListSkeleton = () => {
  const skeletons = Array.from({ length: 4 });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {skeletons.map((_, index) => (
        <Card key={index} className="bg-card/20 py-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-32 h-4 rounded" />
                    <Skeleton className="w-48 h-3 rounded" />
                  </div>
                  <Skeleton className="w-5 h-5 rounded" />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-4">
                  <Skeleton className="w-10 h-3 rounded" />
                  <Skeleton className="w-10 h-3 rounded" />
                  <Skeleton className="w-16 h-3 rounded" />
                  <Skeleton className="w-24 h-3 rounded" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 ml-6">
                <Skeleton className="w-20 h-3 rounded" />
                <Skeleton className="w-8 h-6 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RepoListSkeleton;
