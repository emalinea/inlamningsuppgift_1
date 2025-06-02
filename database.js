const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Usersdb"
});

db.connect((err) => {
  if (err) {
    console.error("Fel vid anslutning till databasen:", err.message);
    process.exit(1);
  }
  console.log("✅ Ansluten till databasen (via database.js)");
});

module.exports = db;
