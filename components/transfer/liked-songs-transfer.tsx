"use client";

import { Button } from "@/components/ui/button";
import { ProgressCard } from "@/components/ui/progress-card";
import { useLikedSongs } from "@/hooks/use-liked-songs";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function LikedSongsTransfer() {
  const { data: likedSongs, isLoading } = useLikedSongs();
  const { mutate: convertPlaylist, isPending } = usePlaylistConversion();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentSong, setCurrentSong] = useState<{
    name: string;
    artists: string;
  } | null>(null);
  const [failedSongs, setFailedSongs] = useState<
    Array<{ name: string; artist: string }>
  >([]);

  const handleTransfer = () => {
    if (!likedSongs) {
      return;
    }

    setCurrentProgress(0);
    setFailedSongs([]);

    convertPlaylist(
      {
        tracks: likedSongs,
        playlistName: "Liked Songs from Spotify",
        onProgress: (progress, song, failed) => {
          setCurrentProgress(progress);
          setCurrentSong(song);
          setFailedSongs(
            failed.map((s) => ({ name: s.name, artist: s.artists })),
          );
        },
      },
      {
        onSuccess: () => {
          toast.success("Liked songs transferred successfully!");
          setCurrentSong(null);
          setCurrentProgress(0);
        },
        onError: (error) => {
          toast.error("Failed to transfer liked songs");
          console.error("Transfer error:", error);
          setCurrentSong(null);
          setCurrentProgress(0);
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {currentSong && (
        <ProgressCard
          songName={currentSong.name}
          artist={currentSong.artists}
          progress={currentProgress}
          failedSongs={failedSongs}
        />
      )}

      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-pink-500/10">
              <Heart className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Liked Songs</h3>
              <p className="text-white/60">
                {likedSongs?.length || 0} songs in your collection
              </p>
            </div>
          </div>
          <Button
            onClick={handleTransfer}
            disabled={isLoading || isPending}
            className="glass-button"
          >
            {isLoading
              ? "Loading..."
              : isPending
                ? "Transferring..."
                : "Transfer to YouTube"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
