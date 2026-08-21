const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sign_language.db", (error) => {
  if (error) {
    console.error("Database error:", error.message);
  } else {
    console.log("SQLite connected");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sign TEXT NOT NULL,
    confidence REAL,
    userId TEXT DEFAULT 'guest',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;