const mysql = require('mysql');
const util = require('util');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'matcha'
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