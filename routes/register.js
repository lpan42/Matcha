const express = require('express');
const router = express.Router();
const connection = require('../config/database');
// const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

router.get('/', (req, res) => {
    if (req.session.userid) {
        res.redirect('/');
    }
    else {
        res.render('register', {
            title: 'register',
            error: req.flash('error'),
            success: req.flash('success'),
            user: req.session
        });
    }
})

router.post('/', (req, res) => {
    connection.query('SELECT email FROM users WHERE email = ?', [req.body.email], (err, rows, fields) => {
        if (err) console.log(err);
        else if (rows[0]) {
            req.flash('error', 'This email has been taken');
            return res.redirect('/register');
        }
        else {
            connection.query('SELECT username FROM users WHERE username = ?', [req.body.username], (err, rows, fields) => {
                if (err) console.log(err);
                else if (rows[0]) {
                    req.flash('error', 'This username has been taken');
                    return res.redirect('/register');
                }
                else {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) console.log(err);
                        const data = {
                            email: req.body.email,
                            username: req.body.username,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: hash,
                            active_link: crypto.randomBytes(10).toString('hex')
                        };
                        connection.query('INSERT INTO users SET ?', data, (err, rows, fields) => {
                            if (err) console.log(err);
                            else {
                                req.flash('success', 'user created, you may login now');
                                return res.redirect('/login');
                            }
                        });
                    });

                }
            });
        }
    });
})
module.exports = router;