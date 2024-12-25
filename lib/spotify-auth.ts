import { generateCodeChallenge, generateCodeVerifier } from "@/lib/pkce";

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/spotify`;
const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
];

export async function initiateSpotifyAuth() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem("spotify_code_verifier", codeVerifier);

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    scope: SCOPES.join(" "),
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function handleSpotifyCallback(code: string): Promise<string> {
  const codeVerifier = sessionStorage.getItem("spotify_code_verifier");
  if (!codeVerifier) {
    throw new Error("No code verifier found");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || "Failed to get token");
  }

  return data.access_token;
}
