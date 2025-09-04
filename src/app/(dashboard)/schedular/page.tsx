
export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vacation Scheduler</h1>
          <p className="text-muted-foreground">
            Schedule commits to maintain your streak while you're away
          </p>
        </div>
      </div>
    </div>
  );
}
