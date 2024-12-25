"use client";

import { SignOutButton } from "@/components/sign-out-button";
import { TransferTabs } from "@/components/transfer/transfer-tabs";
import { useAuthState } from "@/hooks/use-auth-state";
import { motion } from "motion/react";

export function TransferLayout() {
  const { isSpotifyLoggedIn, isYoutubeLoggedIn } = useAuthState();
  const isFullyAuthenticated = isSpotifyLoggedIn && isYoutubeLoggedIn;

  if (!isFullyAuthenticated) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 py-6 md:px-8 md:py-12"
    >
      <div className="glass-card p-4 md:p-8 rounded-2xl relative">
        <SignOutButton />
        <div className="text-center mb-8 pt-8 md:pt-0">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text from-blue-400 to-purple-400">
            Your Music Library
          </h2>
          <p className="text-sm md:text-base text-white/60 mt-2">
            {"Choose what you'd like to transfer to YouTube Music"}
          </p>
        </div>
        <TransferTabs />
      </div>
    </motion.div>
  );
}
