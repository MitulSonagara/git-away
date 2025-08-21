import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, GitBranch } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Schedule Vacation */}
      <Button className="h-auto p-4 text-blue-600 shadow-sm cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 rounded-xl">
        <div className="flex items-center gap-3">
          <Calendar className="!w-6 !h-6" />
          <div className="text-left">
            <div className="text-lg font-semibold">Schedule Vacation</div>
            <div className="text-sm opacity-80">Plan your next break</div>
          </div>
        </div>
      </Button>

      {/* Connect Repo */}
      <Button className="h-auto p-4 text-green-600 shadow-sm cursor-pointer bg-green-500/10 hover:bg-green-500/20 rounded-xl">
        <div className="flex items-center gap-3">
          <GitBranch className="!w-6 !h-6" />
          <div className="text-left">
            <div className="text-lg font-semibold">Connect Repo</div>
            <div className="text-sm opacity-80">Add a new repository</div>
          </div>
        </div>
      </Button>

      {/* Emergency Commit */}
      <Button className="h-auto p-4 text-red-600 shadow-sm cursor-pointer bg-red-500/10 hover:bg-red-500/20 rounded-xl">
        <div className="flex items-center gap-3">
          <AlertTriangle className="!h-6 !w-6" />
          <div className="text-left">
            <div className="text-lg font-semibold">Emergency Commit</div>
            <div className="text-sm opacity-80">Rescue your streak now</div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default QuickActions;
