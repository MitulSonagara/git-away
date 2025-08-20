import { Card, CardContent } from "@/components/ui/card";
import { getContributions } from "./actions/getContributions";
import { getVacationStatus } from "./actions/getVacationStatus";
import ContributionGraph from "./components/ContributionGraph";
import VacationBanner from "./components/VacationBanner";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RecentActivity from "./components/RecentActivity";

function UpcomingJobs({ jobs }: { jobs: any[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Scheduled Jobs</h3>
        <ul className="space-y-2">
          {jobs.map((job, i) => (
            <li key={i} className="flex justify-between items-center">
              <span>{job.repo}</span>
              <Badge variant="outline">{job.status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Recent Commits
function RecentCommits({ commits }: { commits: any[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Commits</h3>
        <ul className="space-y-2">
          {commits.map((commit, i) => (
            <li key={i} className="flex justify-between items-center text-sm">
              <span className="truncate w-2/3">{commit.message}</span>
              <Badge
                variant={
                  commit.status === "SUCCESS" ? "default" : "destructive"
                }
              >
                {commit.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Repo Settings
function RepoSettings({ repos }: { repos: any[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Repo Settings</h3>
        <ul className="space-y-3">
          {repos.map((repo, i) => (
            <li key={i} className="border-b border-muted pb-2">
              <p className="font-medium">{repo.name}</p>
              <p className="text-sm text-muted-foreground">
                {repo.commitsPerWeek} commits/week — Style: {repo.commitStyle}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Audit Log
function AuditLog({ logs }: { logs: any[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Audit Log</h3>
        <ul className="space-y-2 text-sm">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between">
              <span>{log.action}</span>
              <span className="text-muted-foreground">{log.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Streak Progress
function StreakTracker({ streak }: { streak: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Streak Progress</h3>
        <p className="mb-2">Current Streak: {streak} days</p>
        <Progress value={streak % 100 || 10} />
      </CardContent>
    </Card>
  );
}

// Quick Actions
function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button>Start Vacation</Button>
      <Button variant="destructive">Emergency Commit 🚨</Button>
    </div>
  );
}

export default async function Page() {
  const calendar = await getContributions();
  const { name, isVacationActive } = await getVacationStatus();
  // dummy data
  const jobs = [
    { repo: "git-away", status: "SCHEDULED" },
    { repo: "side-project", status: "RUNNING" },
  ];

  const commits = [
    { message: "feat: add vacation banner", status: "SUCCESS" },
    { message: "fix: job scheduler bug", status: "FAILED" },
  ];

  const repos = [
    { name: "git-away", commitsPerWeek: 7, commitStyle: "THEMED" },
    { name: "my-blog", commitsPerWeek: 3, commitStyle: "TIMESTAMP" },
  ];

  const logs = [
    { action: "Logged in", time: "2h ago" },
    { action: "Started vacation mode", time: "1d ago" },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <VacationBanner userName={name} isVacationActive={isVacationActive} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContributionGraph calendar={calendar} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingJobs jobs={jobs} />
        <RecentCommits commits={commits} />
      </div>
      <RepoSettings repos={repos} />
      <AuditLog logs={logs} />
      <StreakTracker streak={42} />
      <QuickActions />
    </div>
  );
}
