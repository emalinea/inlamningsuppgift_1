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
  return rows[0];  
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
}

async function updateUser(id, { name, nickname, age, bio }) {
  const connection = await connectDB();
  const sql = `
    UPDATE users
    SET Name = ?, Nickname = ?, Age = ?, Bio = ?
    WHERE id = ?
  `;
  await connection.execute(sql, [name, nickname, age, bio, id]);
  await connection.end();
}


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};