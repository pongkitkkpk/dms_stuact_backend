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


router.get('/project/getidproject/:id_projects', (req, res) => {
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
    updatedData.updated_at = new Date();
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
        const createdAt = new Date(); 
        // Insert data into the database
        db.query(
            "INSERT INTO projects (id_student,project_name, project_number, codeclub,codebooksomeoutyear,project_phase, yearly,yearly_count, yearly_countsketch, responsible_agency,academic_year, advisor_name, person1_name, person1_contact, person2_name,person2_contact, person3_name, person3_contact,is_1side,is_2side,is_3side,is_4side,is_5side, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
                is_5side,
                createdAt

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
        db.query(
            "INSERT INTO p_indicator  (id_projects,codeclub,yearly_countsketch) VALUES (?,?,?)",
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
// router.put('/project/p_budget/create/:id_project', async (req, res) => {
//     const id_project = req.params.id_project;

//     try {
//         const {
//             codeclub,
//             yearly_countsketch,
//             //A
//             listA1,
//             listA2,
//             listA3,
//             listA4,
//             listA5,
//             listA6,
//             listA7,
//             listA8,
//             listA9,
//             listA10,
//             listA11,
//             listA12,
//             listA13,
//             listA14,
//             listA15,
//             //NA
//             listNA1,
//             listNA2,
//             listNA3,
//             listNA4,
//             listNA5,
//             listNA6,
//             listNA7,
//             listNA8,
//             listNA9,
//             listNA10,
//             listNA11,
//             listNA12,
//             listNA13,
//             listNA14,
//             listNA15,
//             //TA
//             listTA1,
//             listTA2,
//             listTA3,
//             listTA4,
//             listTA5,
//             listTA6,
//             listTA7,
//             listTA8,
//             listTA9,
//             listTA10,
//             listTA11,
//             listTA12,
//             listTA13,
//             listTA14,
//             listTA15,
//             //TPA
//             listTPA1,
//             listTPA2,
//             listTPA3,
//             listTPA4,
//             listTPA5,
//             listTPA6,
//             listTPA7,
//             listTPA8,
//             listTPA9,
//             listTPA10,
//             listTPA11,
//             listTPA12,
//             listTPA13,
//             listTPA14,
//             listTPA15,
//             //SA
//             listSA1,
//             listSA2,
//             listSA3,
//             listSA4,
//             listSA5,
//             listSA6,
//             listSA7,
//             listSA8,
//             listSA9,
//             listSA10,
//             listSA11,
//             listSA12,
//             listSA13,
//             listSA14,
//             listSA15,
//             //SSA
//             listSSA,
//             //BT
//             listBT1,
//             listBT2,
//             listBT3,
//             listBT4,
//             listBT5,
//             listBT6,
//             listBT7,
//             listBT8,
//             listBT9,
//             listBT10,
//             listBT11,
//             listBT12,
//             listBT13,
//             listBT14,
//             listBT15,
//             listBT16,
//             listBT17,
//             listBT18,
//             listBT19,
//             listBT20,
//             //NBT
//             listNBT1,
//             listNBT2,
//             listNBT3,
//             listNBT4,
//             listNBT5,
//             listNBT6,
//             listNBT7,
//             listNBT8,
//             listNBT9,
//             listNBT10,
//             listNBT11,
//             listNBT12,
//             listNBT13,
//             listNBT14,
//             listNBT15,
//             listNBT16,
//             listNBT17,
//             listNBT18,
//             listNBT19,
//             listNBT20,
//             //NNBT
//             listNNBT1,
//             listNNBT2,
//             listNNBT3,
//             listNNBT4,
//             listNNBT5,
//             listNNBT6,
//             listNNBT7,
//             listNNBT8,
//             listNNBT9,
//             listNNBT10,
//             listNNBT11,
//             listNNBT12,
//             listNNBT13,
//             listNNBT14,
//             listNNBT15,
//             listNNBT16,
//             listNNBT17,
//             listNNBT18,
//             listNNBT19,
//             listNNBT20,
//             //TBT
//             listTBT1,
//             listTBT2,
//             listTBT3,
//             listTBT4,
//             listTBT5,
//             listTBT6,
//             listTBT7,
//             listTBT8,
//             listTBT9,
//             listTBT10,
//             listTBT11,
//             listTBT12,
//             listTBT13,
//             listTBT14,
//             listTBT15,
//             listTBT16,
//             listTBT17,
//             listTBT18,
//             listTBT19,
//             listTBT20,
//             //TNBT
//             listTNBT1,
//             listTNBT2,
//             listTNBT3,
//             listTNBT4,
//             listTNBT5,
//             listTNBT6,
//             listTNBT7,
//             listTNBT8,
//             listTNBT9,
//             listTNBT10,
//             listTNBT11,
//             listTNBT12,
//             listTNBT13,
//             listTNBT14,
//             listTNBT15,
//             listTNBT16,
//             listTNBT17,
//             listTNBT18,
//             listTNBT19,
//             listTNBT20,
//             //TPBT
//             listTPBT1,
//             listTPBT2,
//             listTPBT3,
//             listTPBT4,
//             listTPBT5,
//             listTPBT6,
//             listTPBT7,
//             listTPBT8,
//             listTPBT9,
//             listTPBT10,
//             listTPBT11,
//             listTPBT12,
//             listTPBT13,
//             listTPBT14,
//             listTPBT15,
//             listTPBT16,
//             listTPBT17,
//             listTPBT18,
//             listTPBT19,
//             listTPBT20,
//             //SBT
//             listSBT1,
//             listSBT2,
//             listSBT3,
//             listSBT4,
//             listSBT5,
//             listSBT6,
//             listSBT7,
//             listSBT8,
//             listSBT9,
//             listSBT10,
//             listSBT11,
//             listSBT12,
//             listSBT13,
//             listSBT14,
//             listSBT15,
//             listSBT16,
//             listSBT17,
//             listSBT18,
//             listSBT19,
//             listSBT20,
//             //SSA
//             listSSBT,
//         } = req.body;

//         db.query(
//             "UPDATE p_budget SET codeclub = ?, yearly_countsketch = ?, listA1 = ?, listA2 = ?, listA3 = ?, listA4 = ?, listA5 = ?, listA6 = ?, listA7 = ?, listA8 = ?, listA9 = ?, listA10 = ?, listA11 = ?, listA12 = ?, listA13 = ?, listA14 = ?, listA15 = ?, listNA1 = ?, listNA2 = ?, listNA3 = ?, listNA4 = ?, listNA5 = ?, listNA6 = ?, listNA7 = ?, listNA8 = ?, listNA9 = ?, listNA10 = ?, listNA11 = ?, listNA12 = ?, listNA13 = ?, listNA14 = ?, listNA15 = ?, listTA1 = ?, listTA2 = ?, listTA3 = ?, listTA4 = ?, listTA5 = ?, listTA6 = ?, listTA7 = ?, listTA8 = ?, listTA9 = ?, listTA10 = ?, listTA11 = ?, listTA12 = ?, listTA13 = ?, listTA14 = ?, listTA15 = ?, listTPA1 = ?, listTPA2 = ?, listTPA3 = ?, listTPA4 = ?, listTPA5 = ?, listTPA6 = ?, listTPA7 = ?, listTPA8 = ?, listTPA9 = ?, listTPA10 = ?, listTPA11 = ?, listTPA12 = ?, listTPA13 = ?, listTPA14 = ?, listTPA15 = ?, listSA1 = ?, listSA2 = ?, listSA3 = ?, listSA4 = ?, listSA5 = ?, listSA6 = ?, listSA7 = ?, listSA8 = ?, listSA9 = ?, listSA10 = ?, listSA11 = ?, listSA12 = ?, listSA13 = ?, listSA14 = ?, listSA15 = ?, listSSA = ? , listBT1=?, listBT2=?, listBT3=?, listBT4=?, listBT5=?, listBT6=?, listBT7=?, listBT8=?, listBT9=?, listBT10=?, listBT11=?, listBT12=?, listBT13=?, listBT14=?, listBT15=?, listBT16=?, listBT17=?, listBT18=?, listBT19=?, listBT20=?, listNBT1=?, listNBT2=?, listNBT3=?, listNBT4=?, listNBT5=?, listNBT6=?, listNBT7=?, listNBT8=?, listNBT9=?, listNBT10=?, listNBT11=?, listNBT12=?, listNBT13=?, listNBT14=?, listNBT15=?, listNBT16=?, listNBT17=?, listNBT18=?, listNBT19=?, listNBT20=?, listNNBT1=?, listNNBT2=?, listNNBT3=?, listNNBT4=?, listNNBT5=?, listNNBT6=?, listNNBT7=?, listNNBT8=?, listNNBT9=?, listNNBT10=?, listNNBT11=?, listNNBT12=?, listNNBT13=?, listNNBT14=?, listNNBT15=?, listNNBT16=?, listNNBT17=?, listNNBT18=?, listNNBT19=?, listNNBT20=?, listTBT1=?, listTBT2=?, listTBT3=?, listTBT4=?, listTBT5=?, listTBT6=?, listTBT7=?, listTBT8=?, listTBT9=?, listTBT10=?, listTBT11=?, listTBT12=?, listTBT13=?, listTBT14=?, listTBT15=?, listTBT16=?, listTBT17=?, listTBT18=?, listTBT19=?, listTBT20=?, listTNBT1=?, listTNBT2=?, listTNBT3=?, listTNBT4=?, listTNBT5=?, listTNBT6=?, listTNBT7=?, listTNBT8=?, listTNBT9=?, listTNBT10=?, listTNBT11=?, listTNBT12=?, listTNBT13=?, listTNBT14=?, listTNBT15=?, listTNBT16=?, listTNBT17=?, listTNBT18=?, listTNBT19=?, listTNBT20=?, listTPBT1=?, listTPBT2=?, listTPBT3=?, listTPBT4=?, listTPBT5=?, listTPBT6=?, listTPBT7=?, listTPBT8=?, listTPBT9=?, listTPBT10=?, listTPBT11=?, listTPBT12=?, listTPBT13=?, listTPBT14=?, listTPBT15=?, listTPBT16=?, listTPBT17=?, listTPBT18=?, listTPBT19=?, listTPBT20=?, listSBT1=?, listSBT2=?, listSBT3=?, listSBT4=?, listSBT5=?, listSBT6=?, listSBT7=?, listSBT8=?, listSBT9=?, listSBT10=?, listSBT11=?, listSBT12=?, listSBT13=?, listSBT14=?, listSBT15=?, listSBT16=?, listSBT17=?, listSBT18=?, listSBT19=?, listSBT20=?, listSSBT=? ,listBNT1 = ?, listBNT2 = ?, listBNT3 = ?, listBNT4 = ?, listBNT5 = ?, listBNT6 = ?, listBNT7 = ?, listBNT8 = ?, listBNT9 = ?, listBNT10 = ?, listNBNT1 = ?, listNBNT2 = ?, listNBNT3 = ?, listNBNT4 = ?, listNBNT5 = ?, listNBNT6 = ?, listNBNT7 = ?, listNBNT8 = ?, listNBNT9 = ?, listNBNT10 = ?, listNNBNT1 = ?, listNNBNT2 = ?, listNNBNT3 = ?, listNNBNT4 = ?, listNNBNT5 = ?, listNNBNT6 = ?, listNNBNT7 = ?, listNNBNT8 = ?, listNNBNT9 = ?, listNNBNT10 = ?, listTPBNT1 = ?, listTPBNT2 = ?, listTPBNT3 = ?, listTPBNT4 = ?, listTPBNT5 = ?, listTPBNT6 = ?, listTPBNT7 = ?, listTPBNT8 = ?, listTPBNT9 = ?, listTPBNT10 = ?, listSBNT1 = ?, listSBNT2 = ?, listSBNT3 = ?, listSBNT4 = ?, listSBNT5 = ?, listSBNT6 = ?, listSBNT7 = ?, listSBNT8 = ?, listSBNT9 = ?, listSBNT10 = ?, listSSBNT = ?, listC1 = ?, listC2 = ?, listC3 = ?, listC4 = ?, listC5 = ?, listC6 = ?, listC7 = ?, listC8 = ?, listC9 = ?, listC10 = ?, listC11 = ?, listC12 = ?, listC13 = ?, listC14 = ?, listC15 = ?, listC16 = ?, listC17 = ?, listC18 = ?, listC19 = ?, listC20 = ?, listNC1 = ?, listNC2 = ?, listNC3 = ?, listNC4 = ?, listNC5 = ?, listNC6 = ?, listNC7 = ?, listNC8 = ?, listNC9 = ?, listNC10 = ?, listNC11 = ?, listNC12 = ?, listNC13 = ?, listNC14 = ?, listNC15 = ?, listNC16 = ?, listNC17 = ?, listNC18 = ?, listNC19 = ?, listNC20 = ?, listNNC1 = ?, listNNC2 = ?, listNNC3 = ?, listNNC4 = ?, listNNC5 = ?, listNNC6 = ?, listNNC7 = ?, listNNC8 = ?, listNNC9 = ?, listNNC10 = ?, listNNC11 = ?, listNNC12 = ?, listNNC13 = ?, listNNC14 = ?, listNNC15 = ?, listNNC16 = ?, listNNC17 = ?, listNNC18 = ?, listNNC19 = ?, listNNC20 = ?, listTPC1 = ?, listTPC2 = ?, listTPC3 = ?, listTPC4 = ?, listTPC5 = ?, listTPC6 = ?, listTPC7 = ?, listTPC8 = ?, listTPC9 = ?, listTPC10 = ?, listTPC11 = ?, listTPC12 = ?, listTPC13 = ?, listTPC14 = ?, listTPC15 = ?, listTPC16 = ?, listTPC17 = ?, listTPC18 = ?, listTPC19 = ?, listTPC20 = ?, listSC1 = ?, listSC2 = ?, listSC3 = ?, listSC4 = ?, listSC5 = ?, listSC6 = ?, listSC7 = ?, listSC8 = ?, listSC9 = ?, listSC10 = ?, listSC11 = ?, listSC12 = ?, listSC13 = ?, listSC14 = ?, listSC15 = ?, listSC16 = ?, listSC17 = ?, listSC18 = ?, listSC19 = ?, listSC20 = ?, listSSC = ?, listETC = ?, listSETC = ?, listSAll = ? WHERE id_projects = ?",

//             [
//                 codeclub,
//                 yearly_countsketch,
//                 listA1,
//                 listA2,
//                 listA3,
//                 listA4,
//                 listA5,
//                 listA6,
//                 listA7,
//                 listA8,
//                 listA9,
//                 listA10,
//                 listA11,
//                 listA12,
//                 listA13,
//                 listA14,
//                 listA15,
//                 listNA1,
//                 listNA2,
//                 listNA3,
//                 listNA4,
//                 listNA5,
//                 listNA6,
//                 listNA7,
//                 listNA8,
//                 listNA9,
//                 listNA10,
//                 listNA11,
//                 listNA12,
//                 listNA13,
//                 listNA14,
//                 listNA15,
//                 //TA
//                 listTA1,
//                 listTA2,
//                 listTA3,
//                 listTA4,
//                 listTA5,
//                 listTA6,
//                 listTA7,
//                 listTA8,
//                 listTA9,
//                 listTA10,
//                 listTA11,
//                 listTA12,
//                 listTA13,
//                 listTA14,
//                 listTA15,
//                 //TPA
//                 listTPA1,
//                 listTPA2,
//                 listTPA3,
//                 listTPA4,
//                 listTPA5,
//                 listTPA6,
//                 listTPA7,
//                 listTPA8,
//                 listTPA9,
//                 listTPA10,
//                 listTPA11,
//                 listTPA12,
//                 listTPA13,
//                 listTPA14,
//                 listTPA15,
//                 //SA
//                 listSA1,
//                 listSA2,
//                 listSA3,
//                 listSA4,
//                 listSA5,
//                 listSA6,
//                 listSA7,
//                 listSA8,
//                 listSA9,
//                 listSA10,
//                 listSA11,
//                 listSA12,
//                 listSA13,
//                 listSA14,
//                 listSA15,
//                 //SSA
//                 listSSA,
//                 //BT
//                 listBT1,
//                 listBT2,
//                 listBT3,
//                 listBT4,
//                 listBT5,
//                 listBT6,
//                 listBT7,
//                 listBT8,
//                 listBT9,
//                 listBT10,
//                 listBT11,
//                 listBT12,
//                 listBT13,
//                 listBT14,
//                 listBT15,
//                 listBT16,
//                 listBT17,
//                 listBT18,
//                 listBT19,
//                 listBT20,
//                 //NBT
//                 listNBT1,
//                 listNBT2,
//                 listNBT3,
//                 listNBT4,
//                 listNBT5,
//                 listNBT6,
//                 listNBT7,
//                 listNBT8,
//                 listNBT9,
//                 listNBT10,
//                 listNBT11,
//                 listNBT12,
//                 listNBT13,
//                 listNBT14,
//                 listNBT15,
//                 listNBT16,
//                 listNBT17,
//                 listNBT18,
//                 listNBT19,
//                 listNBT20,
//                 //NNBT
//                 listNNBT1,
//                 listNNBT2,
//                 listNNBT3,
//                 listNNBT4,
//                 listNNBT5,
//                 listNNBT6,
//                 listNNBT7,
//                 listNNBT8,
//                 listNNBT9,
//                 listNNBT10,
//                 listNNBT11,
//                 listNNBT12,
//                 listNNBT13,
//                 listNNBT14,
//                 listNNBT15,
//                 listNNBT16,
//                 listNNBT17,
//                 listNNBT18,
//                 listNNBT19,
//                 listNNBT20,
//                 //TBT
//                 listTBT1,
//                 listTBT2,
//                 listTBT3,
//                 listTBT4,
//                 listTBT5,
//                 listTBT6,
//                 listTBT7,
//                 listTBT8,
//                 listTBT9,
//                 listTBT10,
//                 listTBT11,
//                 listTBT12,
//                 listTBT13,
//                 listTBT14,
//                 listTBT15,
//                 listTBT16,
//                 listTBT17,
//                 listTBT18,
//                 listTBT19,
//                 listTBT20,
//                 //TNBT
//                 listTNBT1,
//                 listTNBT2,
//                 listTNBT3,
//                 listTNBT4,
//                 listTNBT5,
//                 listTNBT6,
//                 listTNBT7,
//                 listTNBT8,
//                 listTNBT9,
//                 listTNBT10,
//                 listTNBT11,
//                 listTNBT12,
//                 listTNBT13,
//                 listTNBT14,
//                 listTNBT15,
//                 listTNBT16,
//                 listTNBT17,
//                 listTNBT18,
//                 listTNBT19,
//                 listTNBT20,
//                 //TPBT
//                 listTPBT1,
//                 listTPBT2,
//                 listTPBT3,
//                 listTPBT4,
//                 listTPBT5,
//                 listTPBT6,
//                 listTPBT7,
//                 listTPBT8,
//                 listTPBT9,
//                 listTPBT10,
//                 listTPBT11,
//                 listTPBT12,
//                 listTPBT13,
//                 listTPBT14,
//                 listTPBT15,
//                 listTPBT16,
//                 listTPBT17,
//                 listTPBT18,
//                 listTPBT19,
//                 listTPBT20,
//                 //SBT
//                 listSBT1,
//                 listSBT2,
//                 listSBT3,
//                 listSBT4,
//                 listSBT5,
//                 listSBT6,
//                 listSBT7,
//                 listSBT8,
//                 listSBT9,
//                 listSBT10,
//                 listSBT11,
//                 listSBT12,
//                 listSBT13,
//                 listSBT14,
//                 listSBT15,
//                 listSBT16,
//                 listSBT17,
//                 listSBT18,
//                 listSBT19,
//                 listSBT20,
//                 //SSA
//                 listSSBT,
//                 id_project
//             ],
//             async (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send("Error updating data in the database");
//                 } else {
//                     console.log("Update to database complete");
//                     res.status(200).send("Data updated successfully");
//                 }
//             }
//         );

//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// });

router.put('/project/p_budget/create/:id_project', async (req, res) => {

    const updatedData = req.body; // Updated data sent from the client

    
    const id_projects = req.params.id_project;

    db.query(
        "UPDATE p_budget SET ? WHERE id_projects = ?",
        [updatedData, id_projects], // Pass the updated value of listA1
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error updating project data");
            } else {
                res.status(200).send("Project data updated successfully");
            }
        }
    );
});

router.put('/project/p_indicator/create/:id_project', async (req, res) => {
    const updatedData = req.body; // Updated data sent from the client
    const id_projects = req.params.id_project;
    db.query(
        "UPDATE p_indicator SET ? WHERE id_projects = ?",
        [updatedData, id_projects], // Pass the updated value of listA1
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error updating project data");
            } else {
                res.status(200).send("Project data updated successfully");
            }
        }
    );
});


module.exports = router;