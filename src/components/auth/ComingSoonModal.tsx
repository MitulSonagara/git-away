"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComingSoonModal({ open, onOpenChange }: Readonly<ComingSoonModalProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          <DialogTitle>Coming Soon</DialogTitle>
          <DialogDescription>
            We’re working hard to launch this feature. Stay tuned!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
