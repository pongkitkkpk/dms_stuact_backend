const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});


router.get('/project/codebooksomeoutyear/:id_projects', (req, res) => {
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

router.get('/project/getcodebooksomeoutyear/:codebooksomeoutyear', (req, res) => {
    const codebooksomeoutyear = req.params.codebooksomeoutyear;
    db.query('SELECT * FROM projects WHERE codebooksomeoutyear = ? ', [codebooksomeoutyear], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving project");
        } else {
            res.send(result);
        }
    });
});

router.get('/project/getcodeclub/:codeclub', (req, res) => {
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

router.get('/project/p_person', (req, res) => {
    db.query("SELECT * FROM p_person", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle the error and send an appropriate response
        } else {
            res.send(result);
        }
    });
});

router.put('/project/edit/:id_project', (req, res) => {
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
//dd1
router.post('/project/create/', async (req, res) => {
    try {
        const {
            // Destructure the fields from the request body
            id_student,
            project_name,
            project_number,
            codeclub,
            codebooksomeoutyear,
            project_phase,
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
            is_1side,
            is_2side,
            is_3side,
            is_4side,
            is_5side
        } = req.body;

        // Insert data into the database
        db.query(
            "INSERT INTO projects (id_student,project_name, project_number, codeclub,codebooksomeoutyear,project_phase, yearly,yearly_count, yearly_countsketch, responsible_agency,academic_year, advisor_name, person1_name, person1_contact, person2_name,person2_contact, person3_name, person3_contact,is_1side,is_2side,is_3side,is_4side,is_5side) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                id_student,
                project_name,
                project_number,
                codeclub,
                codebooksomeoutyear,
                project_phase,
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
                is_1side,
                is_2side,
                is_3side,
                is_4side,
                is_5side

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
                //     // 
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
                // 
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send(error); // Handle the error and send an appropriate response
    }
});
//dd2
router.put('/project/create2/:id_project', async (req, res) => {
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

//ddlt3
router.put('/project/create3/:id_project', async (req, res) => {
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };

    // Usage example
    req.body.start_prepare = addDays(req.body.start_prepare, 0);
    req.body.end_prepare = addDays(req.body.end_prepare, 0);
    req.body.start_event = addDays(req.body.start_event, 0);
    req.body.end_event = addDays(req.body.end_event, 0);

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
router.post('/project/p_person/create/', (req, res) => {
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
router.post('/project/p_timestep/create/:id_project', async (req, res) => {
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };

    // Usage example
    req.body.startDurationTable1 = addDays(req.body.startDurationTable1, 0);
    req.body.endDurationTable1 = addDays(req.body.endDurationTable1, 0);
    req.body.startDurationTable2 = addDays(req.body.startDurationTable2, 0);
    req.body.endDurationTable2 = addDays(req.body.endDurationTable2, 0);
    req.body.startDurationTable3 = addDays(req.body.startDurationTable3, 0);
    req.body.endDurationTable3 = addDays(req.body.endDurationTable3, 0);
    req.body.startDurationTable4 = addDays(req.body.startDurationTable4, 0);
    req.body.endDurationTable4 = addDays(req.body.endDurationTable4, 0);
    req.body.startDurationTable5 = addDays(req.body.startDurationTable5, 0);
    req.body.endDurationTable5 = addDays(req.body.endDurationTable5, 0);
    req.body.startDurationTable6 = addDays(req.body.startDurationTable6, 0);
    req.body.endDurationTable6 = addDays(req.body.endDurationTable6, 0);
    req.body.startDurationTable7 = addDays(req.body.startDurationTable7, 0);
    req.body.endDurationTable7 = addDays(req.body.endDurationTable7, 0);
    req.body.startDurationTable8 = addDays(req.body.startDurationTable8, 0);
    req.body.endDurationTable8 = addDays(req.body.endDurationTable8, 0);
    req.body.startDurationTable9 = addDays(req.body.startDurationTable9, 0);
    req.body.endDurationTable9 = addDays(req.body.endDurationTable9, 0);
    req.body.startDurationTable10 = addDays(req.body.startDurationTable10, 0);
    req.body.endDurationTable10 = addDays(req.body.endDurationTable10, 0);
    req.body.startDurationTable11 = addDays(req.body.startDurationTable11, 0);
    req.body.endDurationTable11 = addDays(req.body.endDurationTable11, 0);
    req.body.startDurationTable12 = addDays(req.body.startDurationTable12, 0);
    req.body.endDurationTable12 = addDays(req.body.endDurationTable12, 0);
    req.body.startDurationTable13 = addDays(req.body.startDurationTable13, 0);
    req.body.endDurationTable13 = addDays(req.body.endDurationTable13, 0);
    req.body.startDurationTable14 = addDays(req.body.startDurationTable14, 0);
    req.body.endDurationTable14 = addDays(req.body.endDurationTable14, 0);
    req.body.startDurationTable15 = addDays(req.body.startDurationTable15, 0);
    req.body.endDurationTable15 = addDays(req.body.endDurationTable15, 0);
    try {
        const {
            id_projects,
            codeclub,
            yearly_countsketch,
            table1Topic,
            startDurationTable1,
            endDurationTable1,
            responsibleTable1str,
            table2Topic,
            startDurationTable2,
            endDurationTable2,
            responsibleTable2str,
            table3Topic,
            startDurationTable3,
            endDurationTable3,
            responsibleTable3str,
            table4Topic,
            startDurationTable4,
            endDurationTable4,
            responsibleTable4str,
            table5Topic,
            startDurationTable5,
            endDurationTable5,
            responsibleTable5str,
            table6Topic,
            startDurationTable6,
            endDurationTable6,
            responsibleTable6str,
            table7Topic,
            startDurationTable7,
            endDurationTable7,
            responsibleTable7str,
            table8Topic,
            startDurationTable8,
            endDurationTable8,
            responsibleTable8str,
            table9Topic,
            startDurationTable9,
            endDurationTable9,
            responsibleTable9str,
            table10Topic,
            startDurationTable10,
            endDurationTable10,
            responsibleTable10str,
            table11Topic,
            startDurationTable11,
            endDurationTable11,
            responsibleTable11str,
            table12Topic,
            startDurationTable12,
            endDurationTable12,
            responsibleTable12str,
            table13Topic,
            startDurationTable13,
            endDurationTable13,
            responsibleTable13str,
            table14Topic,
            startDurationTable14,
            endDurationTable14,
            responsibleTable14str,
            table15Topic,
            startDurationTable15,
            endDurationTable15,
            responsibleTable15str
        } = req.body;


        await db.query(
            "UPDATE p_timestep " +
            "SET " +
            "codeclub = ?, " +
            "yearly_countsketch = ?, " +
            "topic_table1 = ?, " +
            "start_duration_table1 = ?, " +
            "end_duration_table1 = ?, " +
            "responsible_table1 = ?, " +
            "topic_table2 = ?, " +
            "start_duration_table2 = ?, " +
            "end_duration_table2 = ?, " +
            "responsible_table2 = ?, " +
            "topic_table3 = ?, " +
            "start_duration_table3 = ?, " +
            "end_duration_table3 = ?, " +
            "responsible_table3 = ?, " +
            "topic_table4 = ?, " +
            "start_duration_table4 = ?, " +
            "end_duration_table4 = ?, " +
            "responsible_table4 = ?, " +
            "topic_table5 = ?, " +
            "start_duration_table5 = ?, " +
            "end_duration_table5 = ?, " +
            "responsible_table5 = ?, " +
            "topic_table6 = ?, " +
            "start_duration_table6 = ?, " +
            "end_duration_table6 = ?, " +
            "responsible_table6 = ?, " +
            "topic_table7 = ?, " +
            "start_duration_table7 = ?, " +
            "end_duration_table7 = ?, " +
            "responsible_table7 = ?, " +
            "topic_table8 = ?, " +
            "start_duration_table8 = ?, " +
            "end_duration_table8 = ?, " +
            "responsible_table8 = ?, " +
            "topic_table9 = ?, " +
            "start_duration_table9 = ?, " +
            "end_duration_table9 = ?, " +
            "responsible_table9 = ?, " +
            "topic_table10 = ?, " +
            "start_duration_table10 = ?, " +
            "end_duration_table10 = ?, " +
            "responsible_table10 = ?, " +
            "topic_table11 = ?, " +
            "start_duration_table11 = ?, " +
            "end_duration_table11 = ?, " +
            "responsible_table11 = ?, " +
            "topic_table12 = ?, " +
            "start_duration_table12 = ?, " +
            "end_duration_table12 = ?, " +
            "responsible_table12 = ?, " +
            "topic_table13 = ?, " +
            "start_duration_table13 = ?, " +
            "end_duration_table13 = ?, " +
            "responsible_table13 = ?, " +
            "topic_table14 = ?, " +
            "start_duration_table14 = ?, " +
            "end_duration_table14 = ?, " +
            "responsible_table14 = ?, " +
            "topic_table15 = ?, " +
            "start_duration_table15 = ?, " +
            "end_duration_table15 = ?, " +
            "responsible_table15 = ? " +
            "WHERE id_projects = ?",
            [
                codeclub,
                yearly_countsketch,
                table1Topic,
                startDurationTable1,
                endDurationTable1,
                responsibleTable1str,
                table2Topic,
                startDurationTable2,
                endDurationTable2,
                responsibleTable2str,
                table3Topic,
                startDurationTable3,
                endDurationTable3,
                responsibleTable3str,
                table4Topic,
                startDurationTable4,
                endDurationTable4,
                responsibleTable4str,
                table5Topic,
                startDurationTable5,
                endDurationTable5,
                responsibleTable5str,
                table6Topic,
                startDurationTable6,
                endDurationTable6,
                responsibleTable6str,
                table7Topic,
                startDurationTable7,
                endDurationTable7,
                responsibleTable7str,
                table8Topic,
                startDurationTable8,
                endDurationTable8,
                responsibleTable8str,
                table9Topic,
                startDurationTable9,
                endDurationTable9,
                responsibleTable9str,
                table10Topic,
                startDurationTable10,
                endDurationTable10,
                responsibleTable10str,
                table11Topic,
                startDurationTable11,
                endDurationTable11,
                responsibleTable11str,
                table12Topic,
                startDurationTable12,
                endDurationTable12,
                responsibleTable12str,
                table13Topic,
                startDurationTable13,
                endDurationTable13,
                responsibleTable13str,
                table14Topic,
                startDurationTable14,
                endDurationTable14,
                responsibleTable14str,
                table15Topic,
                startDurationTable15,
                endDurationTable15,
                responsibleTable15str,
                id_projects
            ]
        );

        res.status(200).json({ message: `p_timestep updated successfully ${codeclub} yearly${yearly_countsketch}` });
        db.query(
            "INSERT INTO p_budget (id_projects,codeclub,yearly_countsketch) VALUES (?,?,?)",
            [id_projects, codeclub, yearly_countsketch],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err); // Handle the error and send an appropriate response
                    return;
                }
            }
        );
    } catch (error) {
        console.error("Error updating p_timestep:", error);
        res.status(500).json({ error: "Database error" });
    }
});
router.post('/project/p_budget/create/:id_projects', async (req, res) => {
    try {
        const {
            id_projects,
            codeclub,
            yearly_countsketch,
            listA1,
            listA2,
            listA3
            
        } = req.body;
        console.log(codeclub)
        db.query(
            "UPDATE p_budget SET  codeclub = ?,yearly_countsketch = ?, listA1 = ?, listA2=?, listA3=?,  WHERE id_projects=?",
            [
                codeclub,
                yearly_countsketch,
                listA1,
                listA2,
                listA3,
                id_projects
                
            ],
            async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error updating data in the database"); // Handle the error and send an appropriate response
                } else {
                    console.log("up to database compleate")
                }


                // db.query("INSERT INTO p_timestep (id_projects,codeclub,yearly_countsketch) VALUES (?,?,?)",
                //     [id_projects, codeclub, yearly_countsketch],
                //     (err) => {
                //         if (err) {
                //             console.error(err);
                //             return res.status(500).send("Error inserting data into the database"); // Handle the error and send an appropriate response
                //         }

                //         res.status(200).send("Data updated and inserted successfully");
                //     }
                // );
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send(error); // Handle the error and send an appropriate response
    }


})
module.exports = router;