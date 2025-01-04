"use client";

import { Event } from "@/types/types";
import { motion } from "framer-motion";
import { Clock, Pencil, X } from "lucide-react";
import Link from "next/link";
import ConfirmModal from "../modal/confirm-modal";
import { useServerAction } from "@/hooks/use-server-action";
import { deleteEvent } from "@/actions/event";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FR, US } from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";

const dedication = {
  id: 1,
  createdAt: new Date().toISOString(),
  sender: { firstName: "John", lastName: "Doe" },
  recipients: [
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "Bob", lastName: "Johnson" },
  ],
  title: "Happy Birthday!",
  message: "Wishing you all the best on your special day!",
  photoURL: null,
};

interface EventTable {
  event: Event;
}

export default function EventTable({ event }: EventTable) {
  const [runAction, isLoading] = useServerAction(deleteEvent);
  const language = event.languange.split(",");
  const router = useRouter();
  const handleStatusUpdate = (id: number, status: string) => {
    console.log(`Dedication ID ${id} updated to ${status}`);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString();
  };

  const handleDelete = async () => {
    const result = await runAction(event.id);

    if (result) {
      toast[result.success ? "success" : "error"](result.message);
      if (result.success) {
        router.push(`/admin/events`);
        router.refresh();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTimestamp(event.createdAt)}
              </span>
            </div>

            <h3 className="font-semibold text-gray-800 flex items-center">
              {event.name}{" "}
              <span
                className={cn(
                  "px-2 py-1 rounded-full ml-1 text-xs font-semibold",
                  event.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {event.isActive ? "Active" : "Pause"}
              </span>{" "}
            </h3>

            <div className="mt-2 text-gray-600">
              {event.description || "No description"}
            </div>

            <div className="flex gap-2">
              {language.includes("en") && <US className="w-12 h-12" />}
              {language.includes("fr") && <FR className="w-12 h-12" />}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {!isLoading && (
            <Link
              href={`/admin/events/${event.id}`}
              className="p-2 text-yellow-500 hover:bg-green-50 rounded-full transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </Link>
          )}
          <ConfirmModal onClick={handleDelete}>
            <button
              disabled={isLoading}
              onClick={() => handleStatusUpdate(dedication.id, "rejected")}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </ConfirmModal>
        </div>
      </div>
    </motion.div>
  );
}
