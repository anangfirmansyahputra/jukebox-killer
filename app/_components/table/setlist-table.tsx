"use client";

import { handleToggle, uploadSong } from "@/actions/song";
import { useServerAction } from "@/hooks/use-server-action";
import { Song } from "@/types/types";
import { ES, FR, GB, IT } from "country-flag-icons/react/3x2";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SetlistTableProps {
  songs: Song[];
}

// Data dummy untuk LANGUAGES_FILES
export const LANGUAGE_FILES = [
  {
    name: "English",
    code: "en",
    Flag: () => <GB />,
    label: "English",
  },
  {
    name: "French",
    code: "fr",
    Flag: () => <FR />,
    label: "French",
  },
  {
    name: "Spanish",
    code: "es",
    Flag: () => <ES />,
    label: "Spanish",
  },
  {
    name: "Italian",
    code: "it",
    Flag: () => <IT />,
    label: "Italian",
  },
];

const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

export default function SetlistTable({ songs }: SetlistTableProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [runAction, isPending] = useServerAction(uploadSong);
  const [runAvailability, isPendingAvailability] =
    useServerAction(handleToggle);
  const router = useRouter();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    languageCode: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      toast.error("Please upload a valid Excel file (.xlsx)");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", languageCode);

    const res = await runAction(formData);

    if (res) {
      toast[res.success ? "success" : "error"](res.message);
      event.target.value = "";
      if (res.success) {
        router.refresh();
      }
    }
  };

  const handleToggleAvailability = async (
    songId: number,
    available: boolean
  ) => {
    const res = await runAvailability({
      songId,
      available,
    });

    if (res) {
      toast[res.success ? "success" : "error"](res.message);
      router.refresh();
    }
  };

  const handleReset = async () => {
    setShowResetConfirm(true);
  };

  // const confirmReset = async () => {
  //   setIsLoading(true);
  //   try {
  //     await songService.resetSongs();
  //     setSongs([]);
  //     setShowResetConfirm(false);
  //   } catch (error) {
  //     toast.error('Failed to delete songs');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Group songs by first letter of normalized artist name
  const groupedSongs = songs.reduce((acc: { [key: string]: Song[] }, song) => {
    const firstLetter = normalizeText(song.artist)[0];
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(song);
    return acc;
  }, {});

  // Sort letters alphabetically
  const sortedLetters = Object.keys(groupedSongs).sort();

  // Sort songs within each group
  Object.keys(groupedSongs).forEach((letter) => {
    groupedSongs[letter].sort((a, b) =>
      normalizeText(a.artist).localeCompare(normalizeText(b.artist))
    );
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Song Management</h2>
          <p className="text-gray-600">
            Import and manage your multilingual song catalog
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {}}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            disabled={isPending || isPendingAvailability}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Reset All
          </motion.button>
        </div>
      </div>

      {/* Import Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Import Songs by Language</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LANGUAGE_FILES.map(({ code, Flag, label }) => (
            <motion.div
              key={code}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl"
            >
              <Flag />
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => handleFileSelect(e, code)}
                className="hidden"
                id={`fileInput-${code}`}
                disabled={isPending || isPendingAvailability}
              />
              <label
                htmlFor={`fileInput-${code}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors text-sm w-full justify-center"
              >
                <Upload className="w-4 h-4" />
                {/* {selectedFiles[code] ? "File Selected" : "Choose File"} */}
                Choose File
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Song List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
          <div className="col-span-3">Artist</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-2">Genre</div>
          <div className="col-span-2">Language</div>
          <div className="col-span-2 text-center">Availability</div>
        </div>

        {/* Loading State */}
        {isPending ||
          (isPendingAvailability && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ))}

        {/* Song Groups */}
        {!isPending &&
          sortedLetters.map((letter) => (
            <div key={letter} className="border-t border-gray-200">
              {/* Letter Header */}
              <div className="bg-gray-50 px-4 py-2 font-bold text-gray-700">
                {letter}
              </div>

              {/* Songs */}
              {groupedSongs[letter].map((song) => (
                <div
                  key={song.id}
                  className="grid grid-cols-12 gap-4 p-4 border-t border-gray-100 hover:bg-gray-50"
                >
                  <div className="col-span-3">{song.artist}</div>
                  <div className="col-span-3">{song.title}</div>
                  <div className="col-span-2">{song.genre}</div>
                  <div className="col-span-2">
                    {song.language === "en" && <GB className="w-6 h-4" />}
                    {song.language === "fr" && <FR className="w-6 h-4" />}
                    {song.language === "es" && <ES className="w-6 h-4" />}
                    {song.language === "it" && <IT className="w-6 h-4" />}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() =>
                        handleToggleAvailability(song.id, !song.available)
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        song.available ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          song.available ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Import Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4 text-amber-500">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Confirm Import</h3>
              </div>
              <p className="mb-6 text-gray-600">
                Are you sure you want to import these songs? This will replace
                existing songs for the selected languages.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {}}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Import
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Confirm Reset</h3>
              </div>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete ALL songs? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Reset All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
