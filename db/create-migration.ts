import fs from "fs";
import path from "path";

// Fungsi untuk membuat nama file yang unik
const generateMigrationName = (name: string) => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Format waktu unik
  return `${timestamp}_${name}`;
};

// Fungsi untuk membuat file migrasi
const createMigration = (migrationName: string) => {
  // Tentukan folder untuk file up dan down
  const upMigrationsDir = path.join(process.cwd(), "db/migrations/up");
  const downMigrationsDir = path.join(process.cwd(), "db/migrations/down");

  // Pastikan folder migrasi up ada
  if (!fs.existsSync(upMigrationsDir)) {
    fs.mkdirSync(upMigrationsDir, { recursive: true });
  }

  // Pastikan folder migrasi down ada
  if (!fs.existsSync(downMigrationsDir)) {
    fs.mkdirSync(downMigrationsDir, { recursive: true });
  }

  // Buat nama file untuk up dan down
  const upFileName = `${migrationName}_up.sql`;
  const downFileName = `${migrationName}_down.sql`;

  // Tentukan path untuk file up dan down
  const upFilePath = path.join(upMigrationsDir, upFileName);
  const downFilePath = path.join(downMigrationsDir, downFileName);

  // Template SQL untuk file up dan down
  const upTemplate = `-- Write your migration SQL for the "up" direction here

-- Example:
-- CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255));

`;

  const downTemplate = `-- Write your rollback SQL for the "down" direction here

-- Example:
-- DROP TABLE users;

`;

  // Menyimpan file SQL untuk up dan down
  fs.writeFileSync(upFilePath, upTemplate);
  fs.writeFileSync(downFilePath, downTemplate);

  console.log(`Created migration files:\n- ${upFilePath}\n- ${downFilePath}`);
};

// Mendapatkan nama migrasi dari argumen command line
const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const migrationFileName = generateMigrationName(migrationName);
createMigration(migrationFileName);
