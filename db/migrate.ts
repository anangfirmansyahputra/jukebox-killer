import { pool } from "@/lib/connection";
import fs from "fs";
import path from "path";

// Fungsi untuk menjalankan migrasi
const migrate = async () => {
  const migrationsDir = path.join(process.cwd(), "db/migrations/up");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"));

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    console.log(`Running migration: ${file}`);

    try {
      await pool.query(sql);
      console.log(`Migration ${file} executed successfully.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error executing migration ${file}:`, error.message);
      } else {
        console.error(`Error executing migration ${file}:`, error);
      }
      process.exit(1);
    }
  }

  console.log("All migrations executed successfully.");
  await pool.end();
};

// Fungsi untuk menjalankan rollback
const rollback = async () => {
  const migrationsDir = path.join(process.cwd(), "db/migrations/down");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"));

  for (const file of files.reverse()) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    console.log(`Rolling back migration: ${file}`);

    try {
      await pool.query(sql);
      console.log(`Rollback of ${file} executed successfully.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error rolling back migration ${file}:`, error.message);
      } else {
        console.error(`Error rolling back migration ${file}:`, error);
      }
      process.exit(1);
    }
  }

  console.log("All rollbacks executed successfully.");
  await pool.end();
};

// Cek argumen untuk menentukan apakah menjalankan migrate atau rollback
const main = async () => {
  const command = process.argv[2];

  if (command === "up") {
    await migrate();
  } else if (command === "down") {
    await rollback();
  } else {
    console.log("Please specify either 'up' or 'down'.");
  }
};

main().catch((err) => console.error(err));
