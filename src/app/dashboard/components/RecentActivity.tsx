import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const mockData = {
  activeVacations: [
    {
      id: 1,
      name: "Beach Trip 2024",
      startDate: "2024-12-15",
      endDate: "2024-12-30",
      repo: "my-awesome-project",
      commitsScheduled: 16,
    },
  ],
  streakProgress: {
    current: 47,
    goal: 365,
    percentage: 47,
  },
  nextCommit: {
    repo: "my-awesome-project",
    scheduledTime: "2024-12-16 10:30 AM",
    message: "Update beach configuration settings",
  },
  recentActivity: [
        {
      type: "vacation_started",
      message: "Vacation mode deactivated for Beach Trip 2025",
      time: "1 hours ago",
    },
    {
      type: "vacation_started",
      message: "Vacation mode activated for Beach Trip 2025",
      time: "2 hours ago",
    },
    {
      type: "commit_scheduled",
      message: "16 commits scheduled for my-awesome-project",
      time: "2 hours ago",
    },
    {
      type: "streak_milestone",
      message: "Reached 47-day streak! 🎉",
      time: "1 day ago",
    },
  ],
};

export default function RecentActivity() {
  return (
    <Card className="bg-card/20 gap-4">
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}

          <Button variant="hero" className="w-full mt-4">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
