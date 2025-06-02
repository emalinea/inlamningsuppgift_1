const mysql = require("mysql2/promise");

async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Usersdb"
  });
  console.log("✅ Ansluten till databasen (via database.js)");
  return connection;
}

// Exporterar en Promise som löser till anslutningen
module.exports = connectDB();