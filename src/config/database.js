const mysql = require('mysql');
const util = require('util');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'matcha',
    connectionLimit: 10,
    multipleStatements: true
});

connection.getConnection((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to mysql");
});

connection.query = util.promisify(connection.query);

module.exports = connection;