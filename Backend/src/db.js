const { Pool } = require("pg");
require("dotenv").config();

console.log("DB_PASSWORD =", typeof process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // must be string
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err.message));

module.exports = pool;
