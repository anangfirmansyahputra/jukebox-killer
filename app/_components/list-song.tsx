"use client";

import { songsData } from "@/lib/data";
import { Search } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ConfirmationModal from "./confirmation-modal";
import { Button } from "@/components/ui/button";
import RecipientModal from "./recipient-modal";
import { Song } from "@/types/types";

type GroupedSong = {
  initial: string;
  songs: Song[];
};
export default function ListSong() {
  const songs = Object.values(
    songsData.en.reduce<Record<string, GroupedSong>>((acc, song) => {
      const initial = song.artist.charAt(0).toUpperCase();
      acc[initial] = acc[initial] || { initial, songs: [] };
      acc[initial].songs.push(song);
      return acc;
    }, {})
  ).sort((a, b) => a.initial.localeCompare(b.initial));
  const [filteredSongs, setFilteredSongs] = useState<GroupedSong[]>(songs);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    const filterSongs = songs
      .map((group) => ({
        ...group,
        songs: group.songs.filter((s) =>
          s.title.toLowerCase().includes(searchTerm)
        ),
      }))
      .filter((group) => group.songs.length > 0);
    setFilteredSongs(filterSongs);
  };

  return (
    <div className="bg-white rounded-lg shadow-md max-w-4xl w-full h-[80vh] flex flex-col">
      <div className="p-8">
        <div className="border flex items-center gap-4 px-4 py-2 rounded-full">
          <Search />
          <input
            type="text"
            className="flex-1 outline-none"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="h-full overflow-y-scroll space-y-5 pb-5">
        {filteredSongs.map(
          (group, i) =>
            group.songs.length > 0 && (
              <div key={i} className=" w-full px-8">
                <div className="bg-gray-50 mb-3 px-4 py-3 rounded-lg font-semibold text-gray-600 shadow">
                  <p>{group.initial}</p>
                </div>
                <div className="space-y-3">
                  {group.songs.map((song, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 border rounded-lg px-4 border-gray-200"
                    >
                      <div className="flex items-center gap-4 justify-between w-full">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {song.title}
                          </h3>
                          <p className="text-xs text-gray-500">{song.artist}</p>
                          <p className="text-sm text-gray-500">{song.genre}</p>
                        </div>
                        <ConfirmationModal
                          onClick={() => setSelectedSong(song)}
                          title={`${song.artist} - ${song.title}`}
                          description="Are you sure you want to selected this song?"
                        >
                          <Button variant={"pink"}>Confirm</Button>
                        </ConfirmationModal>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}

        {filteredSongs.length === 0 && (
          <div className=" w-full px-8 flex space-y-5 flex-col items-center justify-center h-full">
            <div className="">
              <div className="relative aspect-video h-[400px]">
                <Image src={"/images/not-found.svg"} alt={"not-found"} fill />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-600">
              No songs found
            </p>
          </div>
        )}
      </div>

      <RecipientModal setSelectedSong={setSelectedSong} song={selectedSong} />
    </div>
  );
}
