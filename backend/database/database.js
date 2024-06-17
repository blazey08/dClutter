const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to the sqlite3 path
const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(dbPath);
    console.error("Error opening database: ", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    initDB();
  }
});

// Initialize the database
function initDB() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT,
          displayName TEXT
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS apparels (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS outfits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          favorite BOOLEAN
        )`);
  });
}

module.exports = db;
