const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// const generateDocx = require('./genDocument04')

app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "usersystem"
});

app.get('/admin/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

app.delete('/admin/user/deleteUser/:id', (req, res) => { // Added a leading slash
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


app.post('/admin/user/createUser', (req, res) => {
    const { id_student, name_student, department, position, clubName, campus, yearly, codedivision, codeagency, codeworkgroup, codebooksome } = req.body;

    db.query(
        "INSERT INTO users (id_student, name_student, department, position, clubName, campus, yearly, codedivision, codeagency, codeworkgroup, codebooksome) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id_student, name_student, department, position, clubName, campus, yearly, codedivision, codeagency, codeworkgroup, codebooksome],
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

// app.get('/users/:id_student', (req, res) => {
//     const id_student = req.params.id_student;
//     db.query('SELECT * FROM users WHERE id_student = ? ORDER BY id DESC LIMIT 1', [id_student], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err); // Handle the error and send an appropriate response
//         } else {
//             res.send(result);
//         }
//     });
// });



// app.get('/projects', (req, res) => {
//     db.query("SELECT * FROM projects", (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err); // Handle the error and send an appropriate response
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.get('/p_person/:id_projects', (req, res) => {
//     const id_projects = req.params.id_projects;

//     db.query('SELECT * FROM p_person WHERE id_projects = ?', [id_projects], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error fetching p_person data');
//         } else {
//             res.json(result);
//         }
//     });
// });
app.get('/student/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

app.get('/student/project/getidproject/:id_projects', (req, res) => {
    const id_projects = req.params.id_projects;
    db.query('SELECT * FROM projects WHERE id = ? ORDER BY id DESC LIMIT 1', [id_projects], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving project");
        } else {
            res.send(result);
        }
    });
});

app.get('/student/project/getallcodeclub/:codeclub', (req, res) => {
    const codeclub = req.params.codeclub;
    db.query('SELECT * FROM projects WHERE codeclub = ? ', [codeclub], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving project");
        } else {
            res.send(result);
        }
    });
});

app.get('/student/project/getcodeclub/:codeclub', (req, res) => {
    const codeclub = req.params.codeclub;
    db.query('SELECT * FROM projects WHERE codeclub = ? ORDER BY id DESC LIMIT 1', [codeclub], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving project");
        } else {
            res.send(result);
        }
    });
});

app.get('/student/project/p_person', (req, res) => {
    db.query("SELECT * FROM p_person", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

app.put('/student/project/edit/:id_project', (req, res) => {
    const id_project = req.params.id_project;
    const updatedData = req.body; // Updated data sent from the client
    
    // Update the project with the given id_project in the database
    db.query(
        "UPDATE projects SET ? WHERE id = ?",
        [updatedData, id_project],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error updating project data"); // Handle the error and send an appropriate response
            } else {
                res.status(200).send("Project data updated successfully");
            }
        }
    );
});

app.post('/student/project/create/', async (req, res) => {
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };

    // Usage example
    const start_prepare_plus_1_day = addDays(req.body.start_prepare, 0);
    const end_prepare_plus_1_day = addDays(req.body.end_prepare, 0);
    const start_event_plus_1_day = addDays(req.body.start_event, 0);
    const end_event_plus_1_day = addDays(req.body.end_event, 0);
    try {
        const {
            // Destructure the fields from the request body
            id_student,
            project_name,
            project_number,
            codeclub,
            yearly,
            yearly_count,
            yearly_countsketch,
            responsible_agency,
            academic_year,
            advisor_name,
            person1_name,
            person1_contact,
            person2_name,
            person2_contact,
            person3_name,
            person3_contact,
            principles_and_reasons1,
            principles_and_reasons2,
            principles_and_reasons3,
            principles_and_reasons4,
            principles_and_reasons5,
            objective1,
            objective2,
            objective3,
            project_type1,
            project_type2,
            project_type3,
            project_type4,
            project_type5,
            is_newproject,
            is_continueproject,
            location1,
            location2,
            location3,
            start_prepare,
            end_prepare,
            start_event,
            end_event,
            deadline,
            problem1,
            result1,
            problem2,
            result2,
            problem3,
            result3,
            created_at,
            updated_at
        } = req.body;

        // Insert data into the database
        db.query(
            "INSERT INTO projects (id_student,project_name, project_number, codeclub, yearly,yearly_count, yearly_countsketch, responsible_agency,academic_year, advisor_name, person1_name, person1_contact, person2_name,person2_contact, person3_name, person3_contact, principles_and_reasons1,principles_and_reasons2,principles_and_reasons3,principles_and_reasons4,principles_and_reasons5,objective1, objective2, objective3, project_type1, project_type2, project_type3,project_type4,project_type5,is_newproject, is_continueproject,location1, location2, location3, start_prepare, end_prepare,start_event,end_event,deadline,problem1,result1,problem2,result2,problem3,result3,created_at,updated_at ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                id_student,
                project_name,
                project_number,
                codeclub,
                yearly,
                yearly_count,
                yearly_countsketch,
                responsible_agency,
                academic_year,
                advisor_name,
                person1_name,
                person1_contact,
                person2_name,
                person2_contact,
                person3_name,
                person3_contact,
                principles_and_reasons1,
                principles_and_reasons2,
                principles_and_reasons3,
                principles_and_reasons4,
                principles_and_reasons5,
                objective1,
                objective2,
                objective3,
                project_type1,
                project_type2,
                project_type3,
                project_type4,
                project_type5,
                is_newproject,
                is_continueproject,
                location1,
                location2,
                location3,
                start_prepare_plus_1_day,
                end_prepare_plus_1_day,
                start_event_plus_1_day,
                end_event_plus_1_day,
                deadline,
                problem1,
                result1,
                problem2,
                result2,
                problem3,
                result3,
                created_at,
                updated_at
            ],

            async (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err); // Handle the error and send an appropriate response
                    return;
                }
                const projectId = result.insertId;


                // Insert only id_project into the p_person table
                db.query(
                    "INSERT INTO p_person (id_projects,codeclub,yearly_countsketch) VALUES (?,?,?)",
                    [projectId, codeclub, yearly_countsketch],
                    (err, pPersonResult) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send(err); // Handle the error and send an appropriate response
                            return;
                        }

                        // If both insertions are successful, send a success response
                        res.status(200).send({ projectId, pPersonId: pPersonResult.insertId });
                    }
                );

                // try {
                //     // Generate the document
                //     const PizZip = require("pizzip");
                //     const Docxtemplater = require("docxtemplater");
                //     const fs = require("fs");
                //     const path = require("path");

                //     // Load the template
                //     const content = fs.readFileSync(path.resolve(__dirname, "templateDoc", "temp04.docx"), "binary");
                //     const zip = new PizZip(content);
                //     const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

                //     // Render the document
                //     doc.render({
                //         id_student: id_student,
                //         project_name: project_name,
                //         project_number: project_number,
                //         codeclub: codeclub,
                //         yearly: yearly,
                //         yearly_count: yearly_count,
                //         responsible_agency: responsible_agency,
                //         academic_year: academic_year,
                //         advisor_name: advisor_name,
                //         person1_name: person1_name,
                //         person1_contact: person1_contact,
                //         person2_name: person2_name,
                //         person2_contact: person2_contact,
                //         person3_name: person3_name,
                //         person3_contact: person3_contact,
                //         principles_and_reasons1: principles_and_reasons1,
                //         principles_and_reasons2: principles_and_reasons2,
                //         principles_and_reasons3: principles_and_reasons3,
                //         objective1: objective1,
                //         objective2: objective2,
                //         objective3: objective3,
                //         project_type1: project_type1,
                //         project_type2: project_type2,
                //         project_type3: project_type3,
                //         project_type4: project_type4,
                //         project_type5: project_type5,
                //         is_newproject: is_newproject,
                //         is_continueproject: is_continueproject,
                //         location1: location1,
                //         location2: location2,
                //         location3: location3,
                //         start_prepare:start_prepare,
                //         end_prepare:end_prepare,
                //         start_event:start_event,
                //         end_event:end_event,
                //         deadline:deadline,
                //         problem1:problem1,
                //         result1:result1,
                //         problem2:problem2,
                //         result2:result2,
                //         problem3:problem3,
                //         result3:result3
                //     });

                //     // Generate and save the document
                //     const buf = doc.getZip().generate({ type: "nodebuffer", compression: "DEFLATE" });
                //     fs.writeFileSync(path.resolve(__dirname, "e-docx", `e-doc-${project_name}.docx`), buf);


                //     res.send("Project created and document generated successfully!");
                // } catch (error) {
                //     console.error("Error generating document:", error);
                //     res.status(500).send("Error generating document: " + error.message);
                // }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send(error); // Handle the error and send an appropriate response
    }
});

app.post('/student/project/p_person/create/', (req, res) => {
    try {
        const {
            id_projects,
            codeclub,
            yearly_countsketch,
            executiveType1Name,
            executiveType1Number,
            executiveType2Name,
            executiveType2Number,
            executiveType3Name,
            executiveType3Number,
            executiveType4Name,
            executiveType4Number,
            executiveType5Name,
            executiveType5Number,
            grandTotalExecutive,
            professorType1Name,
            professorType1Number,
            professorType2Name,
            professorType2Number,
            professorType3Name,
            professorType3Number,
            professorType4Name,
            professorType4Number,
            professorType5Name,
            professorType5Number,
            grandTotalProfessor,
            studentType1Name,
            studentType1Number,
            studentType2Name,
            studentType2Number,
            studentType3Name,
            studentType3Number,
            studentType4Name,
            studentType4Number,
            studentType5Name,
            studentType5Number,
            grandTotalStudent,
            expertType1Name,
            expertType1Number,
            expertType2Name,
            expertType2Number,
            expertType3Name,
            expertType3Number,
            expertType4Name,
            expertType4Number,
            expertType5Name,
            expertType5Number,
            grandTotalExpert,
            grandTotalAll,
        } = req.body;
        db.query(
            "UPDATE p_person SET executiveType1Name=?, executiveType1Number=?, executiveType2Name=?, executiveType2Number=?, executiveType3Name=?, executiveType3Number=?, executiveType4Name=?, executiveType4Number=?, executiveType5Name=?, executiveType5Number=?, grandTotalExecutive=?, professorType1Name=?, professorType1Number=?, professorType2Name=?, professorType2Number=?, professorType3Name=?, professorType3Number=?, professorType4Name=?, professorType4Number=?, professorType5Name=?, professorType5Number=?, grandTotalProfessor=?, studentType1Name=?, studentType1Number=?, studentType2Name=?, studentType2Number=?, studentType3Name=?, studentType3Number=?, studentType4Name=?, studentType4Number=?, studentType5Name=?, studentType5Number=?, grandTotalStudent=?, expertType1Name=?, expertType1Number=?, expertType2Name=?, expertType2Number=?, expertType3Name=?, expertType3Number=?, expertType4Name=?, expertType4Number=?, expertType5Name=?, expertType5Number=?, grandTotalExpert=?, grandTotalAll=? WHERE id_projects=?",
            [
                executiveType1Name,
                executiveType1Number,
                executiveType2Name,
                executiveType2Number,
                executiveType3Name,
                executiveType3Number,
                executiveType4Name,
                executiveType4Number,
                executiveType5Name,
                executiveType5Number,
                grandTotalExecutive,
                professorType1Name,
                professorType1Number,
                professorType2Name,
                professorType2Number,
                professorType3Name,
                professorType3Number,
                professorType4Name,
                professorType4Number,
                professorType5Name,
                professorType5Number,
                grandTotalProfessor,
                studentType1Name,
                studentType1Number,
                studentType2Name,
                studentType2Number,
                studentType3Name,
                studentType3Number,
                studentType4Name,
                studentType4Number,
                studentType5Name,
                studentType5Number,
                grandTotalStudent,
                expertType1Name,
                expertType1Number,
                expertType2Name,
                expertType2Number,
                expertType3Name,
                expertType3Number,
                expertType4Name,
                expertType4Number,
                expertType5Name,
                expertType5Number,
                grandTotalExpert,
                grandTotalAll,
                id_projects,
            ],
            async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error updating data in the database"); // Handle the error and send an appropriate response
                } else {
                    console.log("up to database compleate")
                }


                db.query("INSERT INTO p_timestep (id_projects,codeclub,yearly_countsketch) VALUES (?,?,?)",
                    [id_projects, codeclub, yearly_countsketch],
                    (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send("Error inserting data into the database"); // Handle the error and send an appropriate response
                        }

                        res.status(200).send("Data updated and inserted successfully");
                    }
                );
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send(error); // Handle the error and send an appropriate response
    }
});






app.listen(3001, () => { // Removed quotes around 3001
    console.log("Server is running on port 3001");
});
