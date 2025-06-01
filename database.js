const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Usersdb'
});


async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function addUser(user) {
  const sql = 'INSERT INTO users (name, nickname, age, bio) VALUES (?, ?, ?, ?)';
  const values = [user.name, user.nickname, user.age, user.bio];
  const [result] = await pool.execute(sql, values);
  return result;
}

async function updateUser(id, user) {
  const sql = 'UPDATE users SET name = ?, nickname = ?, age = ?, bio = ? WHERE id = ?';
  const values = [user.name, user.nickname, user.age, user.bio, id];
  const [result] = await pool.execute(sql, values);
  return result;
}

async function deleteUser(id) {
  const sql = 'DELETE FROM users WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result;
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}; 