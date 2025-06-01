const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// 🧠 EJS som template engine
app.set("view engine", "ejs");

// 🧾 För att läsa formdata
app.use(express.urlencoded({ extended: true }));

// 🌐 Statiska filer (CSS, JS, bilder)
app.use(express.static("Views"));

// 🗄️ MySQL-anslutning
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Usersdb"
});

app.post('/create', (req, res) => {
  const { name, nickname, age, bio } = req.body;

  const sql = "INSERT INTO Users (name, nickname, age, bio) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, nickname, age, bio], (err, result) => {
    if (err) {
      console.error("Fel vid sparande:", err);
      return res.status(500).send("Något gick fel vid sparande");
    }
    res.redirect('/');
  });
});

/* OLD post-code 
   app.post('/create', (req, res) => {
    res.redirect({ message: "Created"});
}); */ 

app.patch("/users/:id", (req, res) => {
 const user = users.find(val => val.id === Number(req.params.id));
 user.name = req.body.name;
 return res.json({ message: "Updated" }); 
});


// ✅ Route: Startsidan – visa alla användare
app.get("/", (req, res) => {
  db.query("SELECT * FROM Users", (err, rows) => {
    if (err) throw err;
    res.render("index", { users: rows });
  });
});

// ✅ Route: Profilsida – visa en specifik användare
app.get("/user", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM Users WHERE id = ?", [id], (err, rows) => {
    if (err) throw err;
    res.render("profile", { user: rows[0] });
  });
});

// ✅ Route: Skapa användare (visa formulär)
app.get("/create", (req, res) => {
  res.render("create");
});

// ✅ Route: Redigera användare (visa formulär)
app.get("/edit", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM Users WHERE id = ?", [id], (err, rows) => {
    if (err) throw err;
    res.render("edit", { user: rows[0] });
  });
});

app.post('/users/:id/delete', async (req, res) => {
  await db.deleteUser(req.params.id);
  res.redirect('/');
});

// ✅ Starta servern
app.listen(5500, () => {
  console.log("Servern körs på http://localhost:5500");
});