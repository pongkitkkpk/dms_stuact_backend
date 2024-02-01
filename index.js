const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "usersystem"
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

app.delete('/deleteUser/:id', (req, res) => { // Added a leading slash
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

app.post('/createUser', (req, res) => {
    const { id_student, name_student, department, position, campus, clubname, codeclub } = req.body;

    db.query(
        "INSERT INTO users (id_student, name_student, department, position, campus, clubname, codeclub) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id_student, name_student, department, position, campus, clubname, codeclub],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err); // Handle the error and send an appropriate response
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.listen(3001, () => { // Removed quotes around 3001
    console.log("Server is running on port 3001");
});
