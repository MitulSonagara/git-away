// components/RepoCardControls.tsx
"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface RepoCardControlsProps {
  active: boolean;
}

export const RepoCardControls = ({ active }: RepoCardControlsProps) => {
  return (
    <div className="flex items-center gap-3 ml-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {active ? "Connected" : "Disconnected"}
        </span>
        <Switch
          checked={active}
          onCheckedChange={() => console.log("clicked switch")}
        />
      </div>
      {/* {active && ( */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("clicked settings")}
        >
          <Settings className="w-4 h-4" />
        </Button>
      {/* )} */}
    </div>
  );
};
