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
})

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
})


app.post('/create', (req, res) => {
    const idStudent = req.body.idStudent;
    const nameStudent = req.body.nameStudent;
    const department = req.body.department;
    const position = req.body.position;
    const campus = req.body.campus;
    const clubName = req.body.clubName;
    const codeClub = req.body.codeClub;

    db.query("INSERT INTO users (idStudent,nameStudent,department,position,campus,clubName,codeClub) VALUES(?,?,?,?,?,?,?)",
        [idStudent, nameStudent, department, position, campus, clubName, codeClub],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        })

})

app.listen('3001', () => {
    console.log("Server is running on port 3001")
})