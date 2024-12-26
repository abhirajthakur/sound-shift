export type Track = {
  name: string;
  artists: string;
  duration: number;
};

export type TrackItem = {
  track: {
    artists: {
      name: string;
    }[];
    duration_ms: number;
    name: string;
  };
};

export type ConversionInput = {
  playlistId?: string;
  playlistName: string;
  tracks?: Track[];
  onProgress: (
    progress: number,
    currentSong: Track,
    failedSongs: Track[],
  ) => void;
};

export type RetryFailedButtonProps = {
  failedSongs: Array<{ name: string; artists: string; duration: number }>;
  playlistName: string;
};
