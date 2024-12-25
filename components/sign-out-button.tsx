"use client";

import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/use-auth-state";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { signOut } = useAuthState();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={signOut}
      className="absolute top-2 right-2 md:top-4 md:right-4 glass-button text-xs md:text-sm"
    >
      <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
      Sign Out
    </Button>
  );
}
