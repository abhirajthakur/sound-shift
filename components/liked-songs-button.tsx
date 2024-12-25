"use client";

import { Button } from "@/components/ui/button";
import { useLikedSongs } from "@/hooks/use-liked-songs";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function LikedSongsButton() {
  const { data: likedSongs, isLoading } = useLikedSongs();
  const { mutate: convertPlaylist, isPending } = usePlaylistConversion();

  const handleTransfer = () => {
    if (!likedSongs) return;

    convertPlaylist(
      {
        tracks: likedSongs,
        playlistName: "Liked Songs from Spotify",
        onProgress: (progress) => {
          toast.info(`Transferring liked songs... ${Math.round(progress)}%`);
        },
      },
      {
        onSuccess: () => {
          toast.success("Liked songs transferred successfully!");
        },
        onError: (error) => {
          toast.error("Failed to transfer liked songs");
          console.error("Transfer error:", error);
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="lg"
        className="glass-button w-full group"
        onClick={handleTransfer}
        disabled={isLoading || isPending}
      >
        <Heart className="mr-2 text-pink-400 group-hover:scale-110 transition-transform" />
        <span className="gradient-text from-pink-400 to-purple-400">
          {isLoading
            ? "Loading..."
            : isPending
              ? "Transferring..."
              : "Transfer Liked Songs"}
        </span>
      </Button>
    </motion.div>
  );
}
