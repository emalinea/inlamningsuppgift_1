const mysql = require("mysql2/promise");

async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Usersdb",
  });
  console.log("✅ Ansluten till databasen (via database.js)");
  return connection;
}

<<<<<<< HEAD
// Funktion för att hämta alla användare från tabellen "Users"
async function getAllUsers() {
  const conn = await connectDB();
  const [rows] = await conn.execute("SELECT * FROM Users");
  await conn.end();
  return rows;
}

// Funktion för att lägga till en användare i tabellen "Users"
async function addUser({ name, nickname, age, bio }) {
  const conn = await connectDB();
  await conn.execute(
    "INSERT INTO Users (name, nickname, age, bio) VALUES (?, ?, ?, ?)",
    [name, nickname, age, bio]
  );
  await conn.end();
}

// Funktion för att hämta en användare med ID
async function getUserById(id) {
  const conn = await connectDB();
  const [rows] = await conn.execute("SELECT * FROM Users WHERE id = ?", [id]);
  await conn.end();
  return rows[0];
}

// Funktion för att ta bort en användare med ID
async function deleteUser(id) {
  const conn = await connectDB();
  await conn.execute("DELETE FROM Users WHERE id = ?", [id]);
  await conn.end();
=======
async function getAllUsers() {
  const connection = await connectDB();
  const [rows] = await connection.query("SELECT * FROM users");
  await connection.end();
  return rows;
}

async function getUserById(id) {
  const connection = await connectDB();
  const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
  await connection.end();
  return rows[0];  // Returnerar första raden eller undefined om ingen
}

async function addUser({ name, nickname, age, bio }) {
  const connection = await connectDB();
  const sql = "INSERT INTO users (Name, Nickname, Age, Bio) VALUES (?, ?, ?, ?)";
  await connection.execute(sql, [name, nickname, age, bio]);
  await connection.end();
}

async function deleteUser(id) {
  const connection = await connectDB();
  await connection.execute("DELETE FROM users WHERE id = ?", [id]);
  await connection.end();
>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
}

module.exports = {
  getAllUsers,
<<<<<<< HEAD
  addUser,
  getUserById,
  deleteUser,
};
=======
  getUserById,
  addUser,
  deleteUser,
};

>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
