"use client";

import { handleYouTubeCallback } from "@/lib/youtube-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function YouTubeCallback() {
  const router = useRouter();

  useEffect(() => {
    try {
      const accessToken = handleYouTubeCallback(window.location.hash);
      sessionStorage.setItem("youtube_access_token", accessToken);
      router.push("/");
    } catch (error) {
      console.error("YouTube auth error:", error);
      router.push("/?error=youtube_auth_failed");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-primary">
        Completing YouTube authentication...
      </div>
    </div>
  );
}
