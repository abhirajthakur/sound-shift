"use client";

import { RetryFailedButton } from "@/components//transfer/retry-failed-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLikedSongs } from "@/hooks/use-liked-songs";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { Track } from "@/lib/types";
import { Heart, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function LikedSongsTransfer() {
  const [progress, setProgress] = useState(0);
  const [failedSongs, setFailedSongs] = useState<Track[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { likedSongs, isLoading } = useLikedSongs();
  const { convertPlaylist, isPending } = usePlaylistConversion();

  const handleTransfer = () => {
    if (!likedSongs) return;
    setFailedSongs([]);
    setIsCompleted(false);

    convertPlaylist(
      {
        tracks: likedSongs,
        playlistName: "Liked Songs from Spotify",
        onProgress: (progress, currentSong, failed) => {
          setProgress(progress);
          setFailedSongs(failed);
        },
      },
      {
        onSuccess: () => {
          toast.success("Liked songs transferred successfully!");
          setProgress(0);
          setIsCompleted(true);
        },
        onError: (error) => {
          toast.error("Failed to transfer liked songs");
          console.error("Transfer error:", error);
          setProgress(0);
          setIsCompleted(true);
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="glass-card p-4 md:p-6 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-pink-500/10">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Liked Songs</h3>
              <p className="text-sm md:text-base text-white/60">
                {isLoading
                  ? "Loading..."
                  : `${likedSongs?.length || 0} songs in your collection`}
              </p>
            </div>
          </div>
          <Button
            onClick={handleTransfer}
            disabled={isLoading || isPending}
            className="glass-button w-full md:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Transferring...</span>
              </>
            ) : (
              "Transfer to YouTube"
            )}
          </Button>
        </div>

        {isPending && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Transfer progress</span>
              <span className="text-white/80">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      {isCompleted && failedSongs.length > 0 && (
        <div className="space-y-4">
          <RetryFailedButton
            failedSongs={failedSongs}
            playlistName="Liked Songs"
          />
          <p className="text-sm text-red-400/80 text-center">
            {failedSongs.length} songs failed to transfer
          </p>
        </div>
      )}
    </motion.div>
  );
}
