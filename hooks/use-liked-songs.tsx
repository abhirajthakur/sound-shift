"use client";

import { useQuery } from "@tanstack/react-query";
import { getLikedSongs } from "@/actions/spotify";

export function useLikedSongs() {
  return useQuery({
    queryKey: ["liked-songs"],
    queryFn: async () => {
      const token = sessionStorage.getItem("spotify_access_token");
      if (!token) {
        throw new Error("No Spotify access token found");
      }
      return getLikedSongs(token);
    },
  });
}
