var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
});

con.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Connected to mysql!");
    con.query(`CREATE DATABASE IF NOT EXISTS matcha;`);
    con.query(`use matcha;`);
    con.query(`CREATE TABLE IF NOT EXISTS users
                (id_user INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL);`);
});
