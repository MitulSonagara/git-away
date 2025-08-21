"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function VacationBanner({
  userName,
  isVacationActive,
}: {
  userName: string;
  isVacationActive: boolean;
}) {
  return (
    <Card className="py-0 bg-card/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">
              Welcome back, {userName}! 🌴
            </h2>
            <p className="text-muted-foreground">
              {isVacationActive
                ? "Your vacation mode is active. Relax while we keep your streak alive!"
                : "Your vacation mode is off. Keep committing to keep your streak alive!"}
            </p>
          </div>
          <div className="text-6xl opacity-50">🏖️</div>
        </div>
      </CardContent>
    </Card>
  );
}
