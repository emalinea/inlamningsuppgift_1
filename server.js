const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();

// Sätt view engine till EJS
app.set("view engine", "ejs");

// Middleware för att kunna läsa formdata från POST
app.use(express.urlencoded({ extended: true }));

// Servera statiska filer (CSS, JS, bilder, etc) från mappen "public"
app.use(express.static(path.join(__dirname, "Views")));

// Visa alla användare på startsidan
app.get("/", async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.render("index", { users });
  } catch (err) {
    console.error("Fel vid hämtning av användare:", err.message);
    res.status(500).send("Fel vid hämtning av användare.");
  }
});

// Visa formulär för att skapa en ny användare
app.get("/create", (req, res) => {
  res.render("create");
});

// Hantera POST från formulär – skapa användare
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

// Visa profil för en användare via id i query param
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

// Hantera borttagning av användare
app.post("/users/:id/delete", async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Fel vid borttagning:", err.message);
    res.status(500).send("Kunde inte ta bort användare.");
  }
});

// Starta servern på port 5500
app.listen(5500, () => {
  console.log("Servern körs på http://localhost:5500");
});


