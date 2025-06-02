const express = require("express");
const path = require("path");
const db = require("./database"); // Använder funktioner från database.js
const app = express();

// 🧠 Sätt EJS som template engine
app.set("view engine", "ejs");

// 🧾 Middleware för att läsa formdata från formulär
app.use(express.urlencoded({ extended: true }));

// 🌐 Servera statiska filer från mappen Views (med stort V)
app.use(express.static(path.join(__dirname, "Views")));

// ✅ Route: Startsidan – visa alla användare
app.get("/", async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.render("index", { users });
  } catch (err) {
    console.error("Fel vid hämtning av användare:", err.message);
    res.status(500).send("Fel vid hämtning av användare.");
  }
});

// ✅ Route: Visa formulär för att skapa ny användare
app.get("/create", (req, res) => {
  res.render("create");
});

// ✅ Route: Hantera POST – skapa ny användare
app.post("/create", async (req, res) => {
  const { name, nickname, age, bio } = req.body;

  if (!name || !nickname || !age || !bio) {
    return res.status(400).send("Alla fält måste fyllas i.");
  }

  try {
    await db.addUser({ name, nickname, age: parseInt(age), bio });
    res.redirect("/");
  } catch (err) {
    console.error("Fel vid skapande:", err.message);
    res.status(500).send("Något gick fel vid skapande av användare.");
  }
});

// ✅ Route: Visa en användares profilsida
app.get("/user", async (req, res) => {
  try {
    const user = await db.getUserById(req.query.id);
    res.render("profile", { user });
  } catch (err) {
    console.error("Fel vid hämtning av användare:", err.message);
    res.status(500).send("Kunde inte hämta användare.");
  }
});

// ✅ Route: Visa formulär för att redigera användare
app.get("/edit", async (req, res) => {
  try {
    const user = await db.getUserById(req.query.id);
    res.render("edit", { user });
  } catch (err) {
    console.error("Fel vid hämtning för redigering:", err.message);
    res.status(500).send("Kunde inte hämta användare för redigering.");
  }
});

// ✅ Route: Hantera borttagning av användare
app.post("/users/:id/delete", async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Fel vid borttagning:", err.message);
    res.status(500).send("Kunde inte ta bort användare.");
  }
});

// ✅ Starta servern
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});