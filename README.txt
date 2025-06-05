# User Management App

Detta är ett projekt där vi har skapat en enkel användarhanteringsapplikation i Node.js med Express och MySQL. 
Projektet är utvecklat i grupp och syftet är att lära oss mer om serverhantering, databaskoppling, CRUD-funktionalitet och frontend med HTML, 
CSS och JavaScript.

1. Funktioner

- **Landningssida** – Visar alla användare från databasen. Varje användare har:
  - En klickbar länk till sin profilsida
  - En "Edit" knapp för att redigera användaren
  - En "X"-knapp för att radera användaren
- **Profilsida** – Visar detaljer om en enskild användare
- **Redigera-sida** – Möjlighet att redigera befintlig användare
- **Skapa användare** – Formulär för att lägga till ny användare
- **Radera användare** – Tar bort användare både från sidan och databasen

2. Tekniker som används

- **Node.js** & **Express** – Serversida och routing
- **MySQL** – Databashantering
- **EJS / HTML** – Dynamisk rendering av sidor
- **CSS** – Design och layout
- **JavaScript (client-side)** – Fetch-anrop och DOM-manipulation

3. Filstruktur 

```
inlamningsuppgift_1/
├── test/              # Test-filer
├── views/             # EJS / CSS-filer
├── database.js        # Databaskoppling
├── server.js          # Express-server och routing
├── README.md          # Dokumentation
```

4.  Installation

1. Klona projektet:
   ```bash
   git clone https://github.com/emalinea/inlamningsuppgift_1.git
   cd user-management-app
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Skapa en MySQL-databas:
   ```sql
   CREATE DATABASE Usersdb;
   ```

4. Skapa tabellen `users`:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     Name VARCHAR(255),
     Nickname VARCHAR(255),
     Age INT,
     Bio TEXT
   );
   ```

5. Justera databasuppgifterna i `database.js`:
   ```js
   const connection = await mysql.createConnection({
     host: "localhost",   
     user: "root",
     password: "root",
     database: "Usersdb"
   });
   ```

6. Starta servern:
   ```bash
   node server.js
   ```

7. Öppna i webbläsare:  
   Gå till [http://localhost:5500]

5. Testa funktioner

- Skapa en ny användare via "Create User"
- Klicka på en användare för att se profil
- Redigera och spara ändringar
- Radera användare och kontrollera att de tas bort

6.  Gruppmedlemmar

- Emma
- Michelle
- Pallavi
- Aleksandra

7. Lärdomar

- Arbeta i team med Git & GitHub
- Hur man kopplar frontend med backend och databas
- CRUD-operationer i en fullstack-miljö
- Strukturera ett Express-projekt













