"use client";

import type { ContributionCalendar } from "@/types/github";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ContributionGraph({
  calendar,
}: {
  calendar: ContributionCalendar | null;
}) {
  if (!calendar) {
    return (
      <Card className="p-6 text-center">
        <CardHeader>
          <CardTitle>Your Contributions</CardTitle>
          <CardDescription>
            Link your GitHub account to see activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No GitHub contributions available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-5xl bg-card">
      <CardHeader>
        <CardTitle>Your Contributions</CardTitle>
        <CardDescription>
          {calendar.totalContributions} contributions in the last year
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-53">
            {calendar.weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[4px]">
                {week.contributionDays.map((day) => (
                  <TooltipProvider key={day.date}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="w-3 h-3 rounded-[3px] hover:scale-110 transition-transform"
                          style={{
                            backgroundColor:
                              day.contributionCount === 0
                                ? "rgb(3, 7, 15, 0.6)" // dark neutral for 0 contributions
                                : day.color,
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {day.contributionCount} contributions on {day.date}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        {calendar.colors && (
          <div className="flex items-center justify-end mt-4 text-xs text-muted-foreground gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              {calendar.colors.map((c, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-[3px]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
