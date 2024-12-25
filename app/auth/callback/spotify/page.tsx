"use client";

import { handleSpotifyCallback } from "@/lib/spotify-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SpotifyCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handleCallback() {
      try {
        const code = searchParams.get("code");
        if (!code) {
          throw new Error("No code found in URL");
        }

        const accessToken = await handleSpotifyCallback(code);
        sessionStorage.setItem("spotify_access_token", accessToken);
        router.push("/");
      } catch (error) {
        console.error("Spotify auth error:", error);
        router.push("/?error=spotify_auth_failed");
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-primary">
        Completing Spotify authentication...
      </div>
    </div>
  );
}
