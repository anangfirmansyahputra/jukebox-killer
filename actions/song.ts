"use server";

import { pool } from "@/lib/connection";
import { Song } from "@/types/types";
import { RowDataPacket } from "mysql2";
import * as XLSX from "xlsx";

export async function uploadSong(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");
    // const language = formData.get("language") as string;

    // Read the file content
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json<RowDataPacket>(sheet);
    const songs = rows.map((row) => {
      if (!row.title || !row.artist || !row.language) {
        throw new Error(
          "Invalid data: Title, Artist, and Language are required"
        );
      }

      return {
        title: row.title,
        artist: row.artist,
        language: row.language,
        genre: row.genre || "",
        duet: row.duet === "1" ? true : false,
        sameSong: row.sameSong || "",
      };
    });

    if (!songs.length) {
      throw new Error("No data found in the Excel file");
    }

    await pool.beginTransaction();

    const query = `INSERT INTO songs (title, artist, language, genre, duet, sameSong) VALUES (?, ?, ?, ?, ?, ?)`;

    for (const song of songs) {
      await pool.query(query, [
        song.title,
        song.artist,
        song.language,
        song.genre,
        song.duet,
        song.sameSong,
      ]);
    }

    await pool.commit();

    return {
      success: true,
      message: "Song uploaded successfully",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { success: false, message };
  }
}

export async function getSongs(): Promise<Song[] | []> {
  // Gunakan parameter binding untuk menghindari SQL Injection
  const sql = "SELECT * FROM songs";

  const [rows] = await pool.query(sql);

  const results = rows as Song[];

  return results;
}

export async function handleToggle({
  songId,
  available,
}: {
  songId: number;
  available: boolean;
}) {
  try {
    const sql = `UPDATE songs SET available = ? WHERE id = ?`;
    await pool.query(sql, [available, songId]);
    return {
      success: true,
      message: "Song updated successfully",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return {
      success: false,
      message,
    };
  }
}
