const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/allusers', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});
router.get('/allprojects', (req, res) => {
    db.query("SELECT * FROM projects", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/studentusers', (req, res) => {
    db.query("SELECT * FROM users WHERE position IN ('S', 'SH', 'Ad')", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/stuactusers', (req, res) => {
    db.query("SELECT * FROM users WHERE position = 'Stuact'", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

router.delete('/user/deleteUser/:id', (req, res) => { // Added a leading slash
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


router.post('/user/createUser', (req, res) => {
    const { id_student,
        name_student,
        department,
        position,
        clubName,
        WorkGroup,
        ClubGroup,
        campus,
        email,
        account_type,
        STU_STATUS_DESC,
        LEVEL_DESC,
        yearly,
        codedivision,
        codeagency,
        codeworkgroup,
        codebooksome,
        codebooksomeoutyear,
        agencyGroupName
     } = req.body;
     console.log(req.body)

    db.query(
        "INSERT INTO users (id_student, name_student, department, position, clubName,WorkGroup,ClubGroup, campus,email,account_type,STU_STATUS_DESC,LEVEL_DESC, yearly, codedivision, codeagency, codeworkgroup, codebooksome,codebooksomeoutyear,agencyGroupName) VALUES (?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id_student,
            name_student,
            department,
            position,
            clubName,
            WorkGroup,
            ClubGroup,
            campus,
            email,
            account_type,
            STU_STATUS_DESC,
            LEVEL_DESC,
            yearly,
            codedivision,
            codeagency,
            codeworkgroup,
            codebooksome,
            codebooksomeoutyear,
            agencyGroupName
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

router.post('/createNetProject', (req, res) => {
    const { 
        project_name,
        responsible_agency,
        campus,
        net_budget,
        yearly,
        
     } = req.body;
     console.log(req.body)
     const createdAt = new Date();
    db.query(
        "INSERT INTO netprojectbudget (project_name, responsible_agency, yearly, campus, net_budget,createdAt) VALUES (?,?,?,?,?,?)",
        [project_name,
            responsible_agency,
            yearly,
            campus,
            net_budget,
            createdAt
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

<<<<<<< HEAD

router.get('/getallNetProject', (req, res) => {
    db.query("SELECT * FROM netprojectbudget", (err, result) => {
=======
router.get('/getNetProject/:clubName', (req, res) => {
    const responsible_agency= req.params.clubName;
    db.query("SELECT * FROM netprojectbudget WHERE responsible_agency = ?",responsible_agency, (err, result) => {
>>>>>>> parent of cf0f8b1 (get netlist)
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

router.delete('/deleteNetProject/:id', (req, res) => { // Added a leading slash
    const id = req.params.id;
    db.query("DELETE FROM netprojectbudget WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

module.exports = router;