"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlaylistConversion } from "@/hooks/use-playlist-conversion";
import { useSpotifyPlaylists } from "@/hooks/use-spotify-playlists";
import { AlertCircle, Music2, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function PlaylistTransfer() {
  const { data: playlists, isLoading, refetch } = useSpotifyPlaylists();
  const { mutate: convertPlaylist, isPending } = usePlaylistConversion();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentSong, setCurrentSong] = useState<{
    name: string;
    artists: string;
  } | null>(null);

  const handleTransfer = (playlistId: string, playlistName: string) => {
    setCurrentProgress(0);

    convertPlaylist(
      {
        playlistId,
        playlistName,
        onProgress: (progress, song, failed) => {
          setCurrentProgress(progress);
          setCurrentSong(song);

          // Only toast failed songs at the end
          if (progress === 100 && failed.length > 0) {
            failed.forEach((song) => {
              toast.error(
                `Failed to transfer: ${song.name} by ${song.artists}`,
              );
            });
          }
        },
      },
      {
        onSuccess: () => {
          toast.success(`${playlistName} transferred successfully!`);
          setCurrentSong(null);
          setCurrentProgress(0);
        },
        onError: (error) => {
          toast.error(`Failed to transfer ${playlistName}`);
          console.error("Transfer error:", error);
          setCurrentSong(null);
          setCurrentProgress(0);
        },
      },
    );
  };

  if (!playlists?.length && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <Alert variant="destructive" className="glass-card border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">
            No playlists found in your Spotify account
          </span>
        </Alert>
        <Button onClick={() => refetch()} className="glass-button w-full">
          <Music2 className="mr-2 h-5 w-5" />
          Refresh Playlists
        </Button>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-white/10 rounded-lg mx-auto" />
          <div className="h-4 w-32 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {currentSong && (
        <div className="glass-card p-3 md:p-4 rounded-xl">
          <div className="space-y-2">
            <p className="text-xs md:text-sm text-white/60">
              Currently transferring:
            </p>
            <p className="text-sm md:text-base font-medium truncate">
              {currentSong.name}
            </p>
            <p className="text-xs md:text-sm text-white/60 truncate">
              {currentSong.artists}
            </p>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="h-[300px] md:h-[400px] pr-4">
        <div className="space-y-3 md:space-y-4">
          {playlists?.map((playlist, index) => (
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
                  Transfer
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
