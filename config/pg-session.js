const pg = require("pg");

require("dotenv").config();

const pgPool = new pg.Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DATABASE_NAME || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Pass2020!",
  port: 5432,
  ssl: true,
});

module.exports = pgPool;