const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'S57l59anig2010',
    database: 'employees'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database");
});

module.exports = db;