"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function QuickActionsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-auto p-4 shadow-sm rounded-xl bg-muted/30 flex items-center gap-3"
        >
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
