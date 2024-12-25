const YOUTUBE_CLIENT_ID = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/youtube`;
const SCOPES = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
];

export function initiateYouTubeAuth() {
  const params = new URLSearchParams({
    client_id: YOUTUBE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "token",
    scope: SCOPES.join(" "),
    include_granted_scopes: "true",
    state: "pass-through-value",
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function handleYouTubeCallback(hash: string): string {
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get("access_token");
  if (!accessToken) {
    throw new Error("No access token found in URL");
  }
  return accessToken;
}
