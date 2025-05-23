const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// 🧠 EJS som template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🧾 För att läsa formdata
app.use(express.urlencoded({ extended: true }));

// 🌐 Statiska filer (CSS, JS, bilder)
app.use(express.static("public"));

// 🗄️ MySQL-anslutning
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Usersdb"
});

app.post('/create', (req, res) => {
    res.redirect({ message: "Created"});
}); 

app.patch("/users/:id", (req, res) => {
 const user = users.find(val => val.id === Number(req.params.id));
 user.name = req.body.name;
 return res.json({ message: "Updated" }); 
});


// ✅ Route: Startsidan – visa alla användare
app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    res.render("index", { users: rows });
  });
});

// ✅ Route: Profilsida – visa en specifik användare
app.get("/user", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
    if (err) throw err;
    res.render("user", { user: rows[0] });
  });
});

// ✅ Route: Skapa användare (visa formulär)
app.get("/create", (req, res) => {
  res.render("create");
});

// ✅ Route: Redigera användare (visa formulär)
app.get("/edit", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
    if (err) throw err;
    res.render("edit", { user: rows[0] });
  });
});


// ✅ Starta servern
app.listen(3000, () => {
  console.log("Servern körs på http://localhost:3000");
});

