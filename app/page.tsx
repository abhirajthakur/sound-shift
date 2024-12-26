"use client";

import { LoginButtons } from "@/components/login-buttons";
import { TransferLayout } from "@/components/transfer/transfer-layout";
import { useAuthState } from "@/hooks/use-auth-state";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isSpotifyLoggedIn, isYoutubeLoggedIn } = useAuthState();
  const isFullyAuthenticated = isSpotifyLoggedIn && isYoutubeLoggedIn;

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-transparent to-purple-500/30 animate-gradient" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl"
      >
        {!isFullyAuthenticated ? (
          <div className="glass-card p-4 md:p-8 rounded-2xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="SoundShift Logo"
                  width={48}
                  height={48}
                />
                <h1 className="text-3xl md:text-4xl font-bold gradient-text from-blue-400 to-purple-400 mb-2">
                  SoundShift
                </h1>
              </div>
              <p className="text-base md:text-lg text-white/60">
                Transfer your playlists from Spotify to YouTube Music seamlessly
              </p>
            </div>
            <LoginButtons />
            <div className="mt-8 text-center text-sm text-white/40">
              <Link href="/terms" className="hover:text-white/60 mr-4">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white/60">
                Privacy Policy
              </Link>
            </div>
          </div>
        ) : (
          <TransferLayout />
        )}
      </motion.div>
    </main>
  );
}
