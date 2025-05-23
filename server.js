const express = require("express");
const mysql = require('mysql2');

const router = express.Router();

const users = [];
let id = 1;

router.get("/users", (req, res) => {
    return res.json(users);
})

router.get("/users/:id", (req, res) => {
    const user = users.find(val => val.id === Number(req.params.id));
    return res.json(user);
});

router.post("/users", (req, res) => {
    users.push({
        name: req.body.name,
        id: ++id
    });
    return res.json({ message: "Created"});
}); 

router.patch("/users/:id", (req, res) => {
 const user = users.find(val => val.id === Number(req.params.id));
 user.name = req.body.name;
 return res.json({ message: "Updated" }); 
});

router.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex(val => val.id === Number(req.params.id));
    users.splice(userIndex, 1);
    return res.json({ message: "Deleted" });
}); 

module.exports = router; 

const server = express();
console.log(__dirname)

server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Usersdb'
});

connection.connect();


// list all users in the database
server.get("/users", function (request, response) {
    connection.query('SELECT * FROM users', function (err, rows) {
        if (err) throw err
        response.render("users", { data: rows });
    })
});

// add a user to database
/* server.post("/users", function (request, response) {
    const sql = 'INSERT INTO `users`(`id`, `name`, `nickname`, `age`, `bio`) VALUES (?, ?, ?)';
    const values = [request.body.id, request.body.name, request.body.nickname, request.body.age, request.body.bio];
    
    connection.execute(sql, values, function (err, result) {
        if (err) throw err;
        console.log(result);
        connection.query('SELECT * FROM users', function (err, rows) {
            if (err) throw err
            response.render("users", { data: rows });
        })
    })
})*/ 

server.listen(3000, function() {
    console.log("Started server at http://localhost:3000/users")
})
