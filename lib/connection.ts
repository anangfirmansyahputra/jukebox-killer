import mysql from "mysql2/promise";

export const pool = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "jukebox_killer",
  port: 8889,
});
