const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "e_health",
    password: "1234",
    port: "3306",
    dateStrings: 'date'
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;