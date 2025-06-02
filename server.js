const express = require("express");
const path = require("path");
<<<<<<< HEAD
const db = require("./database"); // Använder funktioner från database.js
const app = express();

// 🧠 Sätt EJS som template engine
app.set("view engine", "ejs");

// 🧾 Middleware för att läsa formdata från formulär
app.use(express.urlencoded({ extended: true }));

// 🌐 Servera statiska filer från mappen Views (med stort V)
app.use(express.static(path.join(__dirname, "Views")));

// ✅ Route: Startsidan – visa alla användare
=======
const db = require("./database");

const app = express();

// Sätt view engine till EJS
app.set("view engine", "ejs");

// Middleware för att kunna läsa formdata från POST
app.use(express.urlencoded({ extended: true }));

// Servera statiska filer (CSS, JS, bilder, etc) från mappen "public"
app.use(express.static(path.join(__dirname, "Views")));

// Visa alla användare på startsidan
>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
app.get("/", async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.render("index", { users });
  } catch (err) {
    console.error("Fel vid hämtning av användare:", err.message);
    res.status(500).send("Fel vid hämtning av användare.");
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
// ✅ Route: Visa formulär för att skapa ny användare
=======
=======
app.get("/edit", async (req, res) => {
  console.log("Edit-route anropad med id:", req.query.id);
  try {
    const user = await db.getUserById(req.query.id);
    res.render("edit", { user });
  } catch (err) {
    console.error("Fel vid hämtning för redigering:", err.message);
    res.status(500).send("Kunde inte hämta användare för redigering.");
  }
});


>>>>>>> 16e6c7ca4c4a3b07ec7ce484c72fdd9e3b8efc88
// Visa formulär för att skapa en ny användare
>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
app.get("/create", (req, res) => {
  res.render("create");
});

<<<<<<< HEAD
// ✅ Route: Hantera POST – skapa ny användare
=======
// Hantera POST från formulär – skapa användare
>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
app.post("/create", async (req, res) => {
  const { name, nickname, age, bio } = req.body;
  console.log("Skapar användare med:", req.body);

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

<<<<<<< HEAD
// ✅ Route: Visa en användares profilsida
=======
// Visa profil för en användare via id i query param
>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
app.get("/user", async (req, res) => {
  try {
    const user = await db.getUserById(req.query.id);
    if (!user) {
      return res.status(404).send("Användare hittades inte.");
    }
    res.render("profile", { user });
  } catch (err) {
    console.error("Fel vid hämtning av användare:", err.message);
    res.status(500).send("Kunde inte hämta användare.");
  }
});

<<<<<<< HEAD
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
=======
// Hantera borttagning av användare
>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
app.post("/users/:id/delete", async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Fel vid borttagning:", err.message);
    res.status(500).send("Kunde inte ta bort användare.");
  }
});

<<<<<<< HEAD
// ✅ Starta servern
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
=======
// Starta servern på port 5500
app.listen(5500, () => {
  console.log("Servern körs på http://localhost:5500");
});


>>>>>>> 3dbd975df6bac6c064509157d43c13f40b62301b
