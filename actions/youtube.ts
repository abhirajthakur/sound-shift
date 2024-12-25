"use server";

export async function createPlaylist(token: string, name: string) {
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          title: name,
          description: "Transferred from Spotify using Playlist Porter",
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create playlist");
  }
  return response.json();
}

export async function searchVideo(token: string, query: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search video");
  }
  const data = await response.json();
  return data.items[0]?.id?.videoId;
}

export async function addToPlaylist(
  token: string,
  playlistId: string,
  videoId: string,
) {
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId,
          },
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add video to playlist");
  }
  return response.json();
}
