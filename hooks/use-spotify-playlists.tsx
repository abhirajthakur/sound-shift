"use client";

import { getUserPlaylists, type SpotifyPlaylist } from "@/actions/spotify";
import { useQuery } from "@tanstack/react-query";

export function useSpotifyPlaylists() {
  const {
    data: playlists,
    isLoading,
    refetch,
  } = useQuery<SpotifyPlaylist[]>({
    queryKey: ["spotify-playlists"],
    queryFn: async () => {
      const token = sessionStorage.getItem("spotify_access_token");
      if (!token) {
        throw new Error("No Spotify access token found");
      }
      return getUserPlaylists(token);
    },
  });

  return {
    playlists,
    isLoading,
    refetch,
  };
}
