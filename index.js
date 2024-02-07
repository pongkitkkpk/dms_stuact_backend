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

app.post('/createProject', (req, res) => {
    const {
        id_student,
        project_name,
        project_number,
        codeclub,
        yearly,
        yearly_count,
        responsible_agency,
        academic_year,
        advisor_name,
        person1_name,
        person1_contact,
        person2_name,
        person2_contact,
        person3_name,
        person3_contact,
        principles_and_reasons,
        objective1,
        objective2,
        objective3,
        project_type1,
        project_type2,
        project_type3,
        is_newproject,
        is_continueproject,
        number_of_staff,
        number_of_staffstudent,
        number_of_joinstudent,
        etc_typename1,
        number_of_etc1,
        etc_typename2,
        number_of_etc2,
        location1,
        location2,
        location3,
        startDate,
        endDate
    } = req.body;

    db.query(
        // "INSERT INTO projects (project_name, project_number, codeclub, startDate, endDate) VALUES ('asdfasdf', 'B', 'A', NOW(), NOW())",
         "INSERT INTO projects (id_student,project_name, project_number, codeclub, yearly, yearly_count, responsible_agency,academic_year, advisor_name, person1_name, person1_contact, person2_name,person2_contact, person3_name, person3_contact, principles_and_reasons,objective1, objective2, objective3, project_type1, project_type2, project_type3,is_newproject, is_continueproject, number_of_staff, number_of_staffstudent,number_of_joinstudent, etc_typename1, number_of_etc1, etc_typename2, number_of_etc2,location1, location2, location3, startDate, endDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
         [
            id_student,
            project_name,
            project_number,
            codeclub,
            yearly,
            yearly_count,
            responsible_agency,
            academic_year,
            advisor_name,
            person1_name,
            person1_contact,
            person2_name,
            person2_contact,
            person3_name,
            person3_contact,
            principles_and_reasons,
            objective1,
            objective2,
            objective3,
            project_type1,
            project_type2,
            project_type3,
            is_newproject,
            is_continueproject,
            number_of_staff,
            number_of_staffstudent,
            number_of_joinstudent,
            etc_typename1,
            number_of_etc1,
            etc_typename2,
            number_of_etc2,
            location1,
            location2,
            location3,
            startDate,
            endDate
        ],
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
