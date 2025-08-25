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
import { getContributions } from "@/actions/getContributions";

export default async function ContributionGraph() {
  const calendar: ContributionCalendar | null = await getContributions();

  if (!calendar) {
    return (
      <Card className="p-4 text-center">
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
    <Card className="gap-4 bg-card/20">
      <CardHeader>
        <CardTitle className="text-xl">Your Contributions</CardTitle>
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
                                ? "rgb(145, 152, 166, 0.2)" // dark neutral for 0 contributions
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

        <div className="flex justify-between">
          <div className="gap-2 mt-2 text-sm text-muted-foreground">
            {calendar.totalContributions} contributions in the last year
          </div>
          {calendar.colors && (
            <div className="flex items-center justify-end gap-2 mt-2 text-xs text-muted-foreground">
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
        </div>
      </CardContent>
    </Card>
  );
}
