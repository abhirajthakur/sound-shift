"use client";

import { getUserPlaylists, type SpotifyPlaylist } from "@/actions/spotify";
import { useQuery } from "@tanstack/react-query";

export function useSpotifyPlaylists() {
  return useQuery<SpotifyPlaylist[]>({
    queryKey: ["spotify-playlists"],
    queryFn: async () => {
      const token = sessionStorage.getItem("spotify_access_token");
      if (!token) {
        throw new Error("No Spotify access token found");
      }
      return getUserPlaylists(token);
    },
  });
}
