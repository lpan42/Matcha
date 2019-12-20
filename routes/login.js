const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const session = require('express-session');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.userid) {
        res.redirect('/');
    }
    else {
        res.render('login', {
            title: 'login',
            error: req.flash('error'),
            success: req.flash('success'),
            user: req.session
        });
    }
})

router.post('/', (req, res) => {
    connection.query('SELECT * FROM users WHERE username = ?', [req.body.username], (err, rows, fields) => {
        if (err) console.log(err);
        else if (!rows[0]) {
            req.flash('error', 'User does not exit, please create an account first');
            return res.redirect('/register');
        }
        else if (rows[0]) {
            if (!rows[0].active) {
                req.flash('error', 'Your accunt has not been actived, check your email');
                return res.redirect('/login');
            }
            else if (!bcrypt.compareSync(req.body.password, rows[0].password)) {
                req.flash('error', 'password unmatched, try again');
                return res.redirect('/login');
            }
            else {
                req.session.userid = rows[0].id_user;
                req.session.username = rows[0].username;
                req.session.firstname = rows[0].firstname;
                req.session.lastname = rows[0].lastname;
                req.flash('success', 'You have successfully logged in');
                return res.redirect('/');
            }
        }
    })
})

module.exports = router;