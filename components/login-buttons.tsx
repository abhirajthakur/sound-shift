"use client";

import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/use-auth-state";
import { initiateSpotifyAuth } from "@/lib/spotify-auth";
import { initiateYouTubeAuth } from "@/lib/youtube-auth";
import { motion } from "motion/react";
import { useState } from "react";

export function LoginButtons() {
  const {
    isSpotifyLoggedIn,
    isYoutubeLoggedIn,
    setIsSpotifyLoggedIn,
    setIsYoutubeLoggedIn,
  } = useAuthState();

  const [isLoading, setIsLoading] = useState<{
    yotube: boolean;
    spotify: boolean;
  }>();

  const handleSpotifyLogin = async () => {
    setIsLoading({ spotify: true, yotube: false });
    try {
      await initiateSpotifyAuth();
      setIsSpotifyLoggedIn(true);
    } catch (error) {
      console.error("Spotify login error:", error);
    }
    setIsLoading({ spotify: false, yotube: false });
  };

  const handleYouTubeLogin = () => {
    setIsLoading({ spotify: false, yotube: true });
    try {
      initiateYouTubeAuth();
      setIsYoutubeLoggedIn(true);
    } catch (error) {
      console.error("YouTube login error:", error);
    }
    setIsLoading({ spotify: false, yotube: false });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="lg"
          className="glass-button w-full group"
          disabled={
            isSpotifyLoggedIn || isLoading?.yotube || isLoading?.spotify
          }
          onClick={handleSpotifyLogin}
        >
          <SpotifyIcon className="mr-2 text-green-400 group-hover:scale-110 transition-transform" />
          <span className="gradient-text from-green-400 to-emerald-400">
            {isLoading?.spotify
              ? "Connecting to Spotify...."
              : "Connect Spotify"}
          </span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          size="lg"
          className="glass-button w-full group"
          disabled={
            isYoutubeLoggedIn || isLoading?.yotube || isLoading?.spotify
          }
          onClick={handleYouTubeLogin}
        >
          <YoutubeIcon className="mr-2 text-red-400 group-hover:scale-110 transition-transform" />
          <span className="gradient-text from-red-400 to-pink-400">
            {isLoading?.yotube
              ? "Connecting to YouTube...."
              : "Connect YouTube"}
          </span>
        </Button>
      </motion.div>
    </div>
  );
}

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M7.5 12.0685C8.59944 11.6998 9.77639 11.5 11 11.5C13.0238 11.5 14.9199 12.0465 16.5488 13M18 10C16.1509 8.7383 13.9122 8 11.5 8C9.90307 8 8.38216 8.32358 7 8.90839M15.129 16C13.8927 15.3609 12.4894 15 11.0018 15C10.1819 15 9.38762 15.1096 8.63281 15.315"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
