"use client";

import { getPlaylistTracks } from "@/actions/spotify";
import { addToPlaylist, createPlaylist, searchVideo } from "@/actions/youtube";
import { ConversionInput, Track } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePlaylistConversion() {
  const { mutate: convertPlaylist, isPending } = useMutation({
    mutationFn: async ({
      playlistId,
      playlistName,
      tracks: inputTracks,
      onProgress,
    }: ConversionInput) => {
      const spotifyToken = sessionStorage.getItem("spotify_access_token");
      const youtubeToken = sessionStorage.getItem("youtube_access_token");

      if (!youtubeToken) {
        throw new Error("YouTube token missing");
      }

      // Get tracks either from playlist or use provided tracks
      let tracks: Track[];
      if (inputTracks) {
        tracks = inputTracks;
      } else {
        if (!spotifyToken || !playlistId) {
          throw new Error("Spotify token or playlist ID missing");
        }
        tracks = await getPlaylistTracks(spotifyToken, playlistId);
      }

      // Create YouTube playlist
      const youtubePlaylist = await createPlaylist(youtubeToken, playlistName);
      const failed: Track[] = [];

      // Convert each track
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const searchQuery = `${track.name} ${track.artists}`;

        try {
          const videoId = await searchVideo(youtubeToken, searchQuery);
          if (videoId) {
            await addToPlaylist(youtubeToken, youtubePlaylist.id, videoId);
          } else {
            failed.push(track);
          }
        } catch (error) {
          console.error(`Failed to add track: ${searchQuery}`, error);
          failed.push(track);
        }

        onProgress(((i + 1) / tracks.length) * 100, track, failed);
      }

      if (failed.length > 0) {
        toast.error(`Failed to transfer ${failed.length} songs`);
      }

      return { playlist: youtubePlaylist, failedSongs: failed };
    },
  });

  return { convertPlaylist, isPending };
}
