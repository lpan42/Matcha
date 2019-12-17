const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database : 'matcha'
});

connection.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Connected to mysql");
});

module.exports = connection;