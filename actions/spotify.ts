"use server";

import { Track, TrackItem } from "@/lib/types";
import { z } from "zod";

async function fetchAllTracks(token: string, url: string): Promise<Track[]> {
  let allTracks: Track[] = [];
  let nextUrl = url;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tracks");
    }

    const data = await response.json();
    const tracks = data.items.map((item: TrackItem) => ({
      name: item.track.name,
      artists: item.track.artists.map((artist) => artist.name).join(", "),
      duration: item.track.duration_ms,
    }));

    allTracks = [...allTracks, ...tracks];
    nextUrl = data.next;
  }

  return allTracks;
}

const playlistSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(z.object({ url: z.string() })),
  tracks: z.object({ total: z.number() }),
});

export type SpotifyPlaylist = z.infer<typeof playlistSchema>;

export async function getUserPlaylists(token: string) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }
  const data = await response.json();
  return z.array(playlistSchema).parse(data.items);
}

export async function getLikedSongs(token: string) {
  const url = "https://api.spotify.com/v1/me/tracks?limit=50";
  return fetchAllTracks(token, url);
}

export async function getPlaylistTracks(token: string, playlistId: string) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`;
  return fetchAllTracks(token, url);
}
