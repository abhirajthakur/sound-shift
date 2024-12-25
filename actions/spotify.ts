"use server";

import { z } from "zod";

const playlistSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(z.object({ url: z.string() })),
  tracks: z.object({ total: z.number() }),
});

type TrackType = {
  track: {
    artists: {
      name: string;
    }[];
    duration_ms: number;
    name: string;
  };
};

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
  const response = await fetch("https://api.spotify.com/v1/me/tracks", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch liked songs");
  }
  const data = await response.json();

  return data.items.map((item: TrackType) => ({
    name: item.track.name,
    artists: item.track.artists.map((artist) => artist.name).join(", "),
    duration: item.track.duration_ms,
  }));
}

export async function getPlaylistTracks(token: string, playlistId: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tracks");
  }
  const data = await response.json();

  return data.items.map((item: TrackType) => ({
    name: item.track.name,
    artists: item.track.artists.map((artist) => artist.name).join(", "),
    duration: item.track.duration_ms,
  }));
}
