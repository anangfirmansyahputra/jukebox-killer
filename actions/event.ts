"use server";

import { pool } from "@/lib/connection";
import { Event } from "@/types/types";

interface SaveEvent {
  name: string;
  description?: string | null | undefined;
  isActive: boolean;
  language: string[];
  id?: number;
}

export async function getEvent(id?: string): Promise<Event | null> {
  // Gunakan parameter binding untuk menghindari SQL Injection
  const sql = id ? "SELECT * FROM events WHERE id = ?" : "SELECT * FROM events";

  const [rows] = await pool.query(sql, id ? [id] : []);

  const results = rows as Event[];

  if (results.length === 0) {
    return null;
  }

  return results[0];
}

export async function saveEvent(event: SaveEvent) {
  try {
    const language = event.language.join(",");

    const sql = event.id
      ? "UPDATE events SET name = ?, description = ?, isActive = ?, languange = ? WHERE id = ?"
      : "INSERT INTO events (name, description, isActive, languange) VALUES (?, ?, ?, ?)";

    await pool.query(
      sql,
      event.id
        ? [event.name, event.description, event.isActive, language, event.id]
        : [event.name, event.description, event.isActive, language]
    );
    return {
      success: true,
      message: event.id
        ? "Event updated successfully"
        : "Event created successfully",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { success: false, message };
  }
}

export async function deleteEvent(id: number) {
  try {
    await pool.query("DELETE FROM events WHERE id = ?", [id]);
    return { success: true, message: "Event deleted successfully" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { success: false, message };
  }
}
