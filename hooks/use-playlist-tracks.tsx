"use client";

import { getPlaylistTracks } from "@/actions/spotify";
import { useQuery } from "@tanstack/react-query";

export function usePlaylistTracks(playlistId: string | null) {
  return useQuery({
    queryKey: ["playlist-tracks", playlistId],
    queryFn: async () => {
      if (!playlistId) {
        throw new Error("No playlist ID provided");
      }
      const token = sessionStorage.getItem("spotify_access_token");
      if (!token) {
        throw new Error("No Spotify access token found");
      }
      return getPlaylistTracks(token, playlistId);
    },
    enabled: !!playlistId,
  });
}
