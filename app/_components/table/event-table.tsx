"use client";

import { Check, Clock, X } from "lucide-react";
import { motion } from "framer-motion";

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

export default function EventTable() {
  const handleStatusUpdate = (id: number, status: string) => {
    console.log(`Dedication ID ${id} updated to ${status}`);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTimestamp(dedication.createdAt)}
            </span>
            {dedication.photoURL && (
              <span className="text-blue-500">
                <img
                  src={dedication.photoURL}
                  alt="Photo"
                  className="w-4 h-4 rounded"
                />
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-800">
            From: {dedication.sender.firstName} {dedication.sender.lastName}
          </h3>

          <div className="mt-1 text-gray-600">
            To:{" "}
            {dedication.recipients
              .map((r) => `${r.firstName} ${r.lastName}`)
              .join(", ")}
          </div>

          {dedication.title && (
            <div className="mt-2 font-medium text-gray-700">
              {dedication.title}
            </div>
          )}

          <div className="mt-2 text-gray-600">{dedication.message}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleStatusUpdate(dedication.id, "approved")}
            className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleStatusUpdate(dedication.id, "rejected")}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
