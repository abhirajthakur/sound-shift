"use client";

import { Button } from "@/components/ui/button";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { RetryFailedButtonProps } from "@/lib/types";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function RetryFailedButton({
  failedSongs,
  playlistName,
}: RetryFailedButtonProps) {
  const { convertPlaylist, isPending } = usePlaylistConversion();

  const handleRetry = () => {
    convertPlaylist(
      {
        tracks: failedSongs,
        playlistName: `${playlistName} (Retry)`,
        onProgress: (progress) => {
          toast.info(`Retrying failed songs... ${Math.round(progress)}%`);
        },
      },
      {
        onSuccess: () => {
          toast.success("Retry completed successfully!");
        },
        onError: (error) => {
          toast.error("Failed to retry songs");
          console.error("Retry error:", error);
        },
      },
    );
  };

  return (
    <Button
      onClick={handleRetry}
      disabled={isPending || failedSongs.length === 0}
      className="glass-button w-full group"
    >
      <RefreshCw className="mr-2 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
      <span className="gradient-text from-yellow-400 to-orange-400">
        {isPending ? "Retrying..." : `Retry ${failedSongs.length} Failed Songs`}
      </span>
    </Button>
  );
}
