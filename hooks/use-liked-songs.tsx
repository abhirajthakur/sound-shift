"use client";

import { getLikedSongs } from "@/actions/spotify";
import { useQuery } from "@tanstack/react-query";

export function useLikedSongs() {
  const { data: likedSongs, isLoading } = useQuery({
    queryKey: ["liked-songs"],
    queryFn: async () => {
      const token = sessionStorage.getItem("spotify_access_token");
      if (!token) {
        throw new Error("No Spotify access token found");
      }
      return getLikedSongs(token);
    },
  });

  return { likedSongs, isLoading };
}
