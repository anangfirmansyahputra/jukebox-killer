"use server";

import { pool } from "@/lib/connection";
import bcrypt from "bcrypt";

export async function loginAdmin(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Mencari admin berdasarkan email
    const [rows] = await pool.query(`SELECT * FROM admins WHERE email = ?`, [
      email,
    ]);

    const result = rows as { email: string; password: string }[];

    // Jika admin tidak ditemukan
    if (result.length === 0) {
      return {
        success: false,
        message: "Admin not found",
      };
    }

    const admin = result[0];

    // Membandingkan password yang dikirimkan dengan password yang ada di database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // Jika password valid
    return {
      success: true,
      message: "Login successful",
      admin,
    };
  } catch (err: unknown) {
    // Menangani error
    const message = err instanceof Error ? err.message : "Something went wrong";
    return {
      success: false,
      message,
    };
  }
}
