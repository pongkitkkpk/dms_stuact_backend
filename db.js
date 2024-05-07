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
    user: "root",
    host: "localhost",
    password: "",
    database: "usersystem"
});

module.exports = db;
