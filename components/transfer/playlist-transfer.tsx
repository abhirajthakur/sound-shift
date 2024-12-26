"use client";

import { RetryFailedButton } from "@/components//transfer/retry-failed-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { useSpotifyPlaylists } from "@/hooks/use-spotify-playlists";
import { Track } from "@/lib/types";
import { Loader2, Music2, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function PlaylistTransfer() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [failedSongs, setFailedSongs] = useState<Track[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playlists, isLoading, refetch } = useSpotifyPlaylists();
  const { convertPlaylist, isPending } = usePlaylistConversion();

  const handleTransfer = (playlistId: string, playlistName: string) => {
    setSelectedPlaylist({ id: playlistId, name: playlistName });
    setFailedSongs([]);
    setIsCompleted(false);

    convertPlaylist(
      {
        playlistId,
        playlistName,
        onProgress: (progress, currentSong, failed) => {
          setProgress(progress);
          setFailedSongs(failed);
        },
      },
      {
        onSuccess: () => {
          toast.success("Playlist transferred successfully!");
          setProgress(0);
          setIsCompleted(true);
        },
        onError: (error) => {
          toast.error("Failed to transfer playlist");
          console.error("Transfer error:", error);
          setProgress(0);
          setIsCompleted(true);
        },
      },
    );
  };

  if (!playlists?.length) {
    return (
      <Button
        onClick={() => refetch()}
        disabled={isLoading}
        className="glass-button w-full"
      >
        {isLoading ? (
          <span className="animate-pulse">Loading playlists...</span>
        ) : (
          <>
            <Music2 className="mr-2 text-blue-400" />
            <span className="gradient-text from-blue-400 to-indigo-400">
              Load Your Playlists
            </span>
          </>
        )}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {isPending && selectedPlaylist && (
        <div className="glass-card p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">
              Transferring {selectedPlaylist.name}
            </span>
            <span className="text-white/80">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <ScrollArea className="h-[300px] md:h-[400px] rounded-xl glass-card p-4">
        <div className="space-y-3">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-3 md:p-4 rounded-xl hover-scale"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3 min-w-0">
                  {playlist.images[0] ? (
                    <Image
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 md:h-16 md:w-16 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <PlayCircle className="h-6 w-6 md:h-8 md:w-8 text-white/40" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm md:text-base truncate">
                      {playlist.name}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60">
                      {playlist.tracks.total} tracks
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleTransfer(playlist.id, playlist.name)}
                  disabled={isPending}
                  className="glass-button text-xs md:text-sm px-3 md:px-4"
                >
                  {isPending && selectedPlaylist?.id === playlist.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Transfer"
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {isCompleted && failedSongs.length > 0 && selectedPlaylist && (
        <div className="space-y-4">
          <RetryFailedButton
            failedSongs={failedSongs}
            playlistName={selectedPlaylist.name}
          />
          <p className="text-sm text-red-400/80 text-center">
            {failedSongs.length} songs failed to transfer
          </p>
        </div>
      )}
    </div>
  );
}
