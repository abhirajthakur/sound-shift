"use client";

import { useEffect, useState } from "react";

export function useAuthState() {
  const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false);
  const [isYoutubeLoggedIn, setIsYoutubeLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = sessionStorage.getItem("spotify_access_token");
    const youtubeToken = sessionStorage.getItem("youtube_access_token");

    // const isAuthenticated = spotifyToken && youtubeToken;

    setIsSpotifyLoggedIn(!!spotifyToken);
    setIsYoutubeLoggedIn(!!youtubeToken);

    // Set authentication cookie
    // if (isAuthenticated) {
    //   document.cookie = "isAuthenticated=true; path=/";
    // }
  }, []);

  const signOut = () => {
    sessionStorage.removeItem("spotify_access_token");
    sessionStorage.removeItem("youtube_access_token");
    sessionStorage.removeItem("spotify_code_verifier");
    // document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
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
