"use strict";
const mysql = require("mysql2");
require("dotenv").config(); // This loads the .env variables into the process.env

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone: "Z", // Z = "UTC"
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.on("error", err => console.log("Connection to DB is off\n" + err));

module.exports = { db };
