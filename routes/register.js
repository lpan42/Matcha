const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const session = require('express-session');

router.get('/', (req, res) => {
    res.render('register');
})
router.post('/', (req, res) => {
    //if (req.body.email && req.body.username && req.body.firstname && req.body.lastname && req.body.password && req.body.password_repeat) {
    connection.query('SELECT username FROM users WHERE username = ?', [req.body.username],
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            if (rows[0]) {
                req.session.error = "This username has been taken";
            }
        });
    https: //scotch.io/courses/create-a-crud-app-with-node-and-mongodb/showing-success-messages
        connection.query('SELECT email FROM users WHERE email = ?', [req.body.email],
            (err, rows, fields) => {
                if (err) {
                    console.log(err);
                }
                if (rows[0]) {
                    req.session.error = "This email has been taken";
                }
            });

    res.send(req.body);
})

module.exports = router;