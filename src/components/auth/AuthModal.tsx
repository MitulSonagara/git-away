"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: Readonly<AuthModalProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Welcome</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center justify-center gap-2"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline">Terms</a> and{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </DialogContent>
    </Dialog>
  );
}
