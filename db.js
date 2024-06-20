
require('dotenv').config()
const mysql = require('mysql');


//docker
// const db = mysql.createConnection({
//     user: "root",
//     host: "mysql",
//     password: "123456789",
//     database: "DMS"
// });
// xampp
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = db;
