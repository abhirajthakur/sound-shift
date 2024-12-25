"use client";

import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";

interface ProgressCardProps {
  songName: string;
  artist: string;
  progress: number;
  failedSongs: Array<{ name: string; artist: string }>;
}

export function ProgressCard({
  songName,
  artist,
  progress,
  failedSongs,
}: ProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-xl space-y-4"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Transferring:</h3>
        <p className="text-white/80">{songName}</p>
        <p className="text-sm text-white/60">{artist}</p>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-white/60 text-right">
          {Math.round(progress)}% Complete
        </p>
      </div>

      {failedSongs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-red-400">
            Failed to transfer:
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {failedSongs.map((song, index) => (
              <p key={index} className="text-sm text-white/60">
                {song.name} - {song.artist}
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
