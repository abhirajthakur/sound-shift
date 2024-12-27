"use client";

import { useEffect, useState } from "react";

export function useAuthState() {
  const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false);
  const [isYoutubeLoggedIn, setIsYoutubeLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = sessionStorage.getItem("spotify_access_token");
    const youtubeToken = sessionStorage.getItem("youtube_access_token");

    setIsSpotifyLoggedIn(!!spotifyToken);
    setIsYoutubeLoggedIn(!!youtubeToken);
  }, []);

  const signOut = () => {
    sessionStorage.removeItem("spotify_access_token");
    sessionStorage.removeItem("youtube_access_token");
    sessionStorage.removeItem("spotify_code_verifier");
    setIsSpotifyLoggedIn(false);
    setIsYoutubeLoggedIn(false);
    window.location.reload();
  };

  return {
    isSpotifyLoggedIn,
    isYoutubeLoggedIn,
    setIsSpotifyLoggedIn,
    setIsYoutubeLoggedIn,
    signOut,
  };
}
