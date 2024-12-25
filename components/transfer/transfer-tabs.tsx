"use client";

import { LikedSongsTransfer } from "@/components/transfer/liked-songs-transfer";
import { PlaylistTransfer } from "@/components/transfer/playlist-transfer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TransferTabs() {
  return (
    <Tabs defaultValue="playlists" className="w-full">
      <TabsList className="w-full flex items-center justify-between max-w-md mx-auto glass-card py-6 px-1 space-x-1 mb-8">
        <TabsTrigger
          value="playlists"
          className="w-full data-[state=active]:glass-button data-[state=active]:shadow-none px-4 py-2.5"
        >
          Playlists
        </TabsTrigger>
        <TabsTrigger
          value="liked"
          className="w-full data-[state=active]:glass-button data-[state=active]:shadow-none px-4 py-2.5"
        >
          Liked Songs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="playlists" className="mt-0">
        <PlaylistTransfer />
      </TabsContent>

      <TabsContent value="liked" className="mt-0">
        <LikedSongsTransfer />
      </TabsContent>
    </Tabs>
  );
}
