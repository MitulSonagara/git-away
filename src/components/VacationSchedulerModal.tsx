"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";

// Mock repos — replace with API call to fetch user’s active repos
const mockRepos = [
  { id: "repo1", name: "my-cool-repo" },
  { id: "repo2", name: "nextjs-app" },
  { id: "repo3", name: "portfolio-site" },
];

const VacationSchedulerModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);

  const toggleRepo = (repoId: string) => {
    setSelectedRepos((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId]
    );
  };

  const handleSubmit = () => {
    console.log({
      name,
      startDate,
      endDate,
      repos: selectedRepos,
    });

    // TODO: Call your server action / API to create schedule
    // await createSchedule({ name, startDate, endDate, repos: selectedRepos })

    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Schedule Vacation
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl space-y-4">
          <DialogHeader>
            <DialogTitle>Schedule New Vacation</DialogTitle>
          </DialogHeader>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Schedule Name</Label>
            <Input
              id="name"
              placeholder="Goa Trip"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {startDate ? format(startDate, "PPP") : "Pick a start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {endDate ? format(endDate, "PPP") : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Repo Selection */}
          <div className="space-y-2">
            <Label>Select Repositories</Label>
            <div className="grid gap-2">
              {mockRepos.map((repo) => (
                <label
                  key={repo.id}
                  className="flex items-center space-x-2 rounded border p-2"
                >
                  <Checkbox
                    checked={selectedRepos.includes(repo.id)}
                    onCheckedChange={() => toggleRepo(repo.id)}
                  />
                  <span>{repo.name}</span>
                </label>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VacationSchedulerModal;
