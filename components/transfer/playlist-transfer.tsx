"use client";

import { RetryFailedButton } from "@/components//transfer/retry-failed-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { useSpotifyPlaylists } from "@/hooks/use-spotify-playlists";
import { Track } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2, Music2, PlayCircle, RefreshCw } from "lucide-react";
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

  const handleRefresh = () => {
    refetch();
  };

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
        onClick={handleRefresh}
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
      <div className="flex justify-end">
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          size="sm"
          className="glass-button"
        >
          <RefreshCw
            className={cn("w-4 h-4 text-blue-400", {
              "animate-spin": isLoading,
            })}
          />
          <span className="gradient-text from-blue-400 to-indigo-400">
            Refresh
          </span>
        </Button>
      </div>

      <ScrollArea className="h-[300px] rounded-xl glass-card p-4">
        <div className="space-y-2">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card p-3 rounded-xl hover-scale">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    {playlist.images[0] ? (
                      <Image
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <PlayCircle className="h-12 w-12 text-white/60" />
                    )}
                    <div>
                      <h3 className="font-medium">{playlist.name}</h3>
                      <p className="text-sm text-white/60">
                        {playlist.tracks.total} tracks
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleTransfer(playlist.id, playlist.name)}
                    disabled={isPending}
                    className="glass-button min-w-[80px]"
                  >
                    {isPending && selectedPlaylist?.id === playlist.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="gradient-text from-blue-400 to-indigo-400">
                        Transfer
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {isPending && selectedPlaylist && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Converting playlist... {Math.round(progress)}%
          </p>
        </div>
      )}

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
