import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Flame, Plane, Zap } from "lucide-react";

interface StateCardsProps {
  currentStreak: number;
  longestStreak: number;
}

export default function StateCards({
  currentStreak,
  longestStreak,
}: StateCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl">Current Streak</CardTitle>
          <Zap className="w-6 h-6 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {currentStreak}
          </div>
          <p className="text-xs text-muted-foreground">days and counting!</p>
        </CardContent>
      </Card>

      <Card className="bg-card/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl">Longest Streak</CardTitle>
          <Flame className="w-6 h-6 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-500">
            {longestStreak}
          </div>
          <p className="text-xs text-muted-foreground">
            most consecutive days of code
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl ">Emergency Commits</CardTitle>
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">7</div>
          <p className="text-xs text-muted-foreground">streaks rescued</p>
        </CardContent>
      </Card>

      <Card className="bg-card/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl">Vacation Scheduled</CardTitle>
          <Plane className="w-6 h-6 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">10</div>
          <p className="text-xs text-muted-foreground">
            vacations scheduled safely
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
