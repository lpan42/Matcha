const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const session = require('express-session');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (!req.session.userid) {
        res.redirect('/');
    }
    else {
        res.render('account', {
            title: 'My account',
            error: req.flash('error'),
            success: req.flash('success'),
            user: req.session
        });
    }
})
router.post('/email', (req, res) => {
    connection.query('SELECT email FROM users WHERE id_user = ?', [req.session.userid], (err, rows, fields) => {
        if (err) console.log(err);
        else if (rows[0].email != req.body.old_email) {
            req.flash('error', 'Old email did not match, please comfirm');
            return res.redirect('/account');
        }
        else{
            if(req.body.new_email != req.body.new_email_repeat){
                req.flash('error', 'new email mismatch, try again');
                return res.redirect('/account');
            }
            else{
                connection.query('UPDATE users SET email = ? Where id_user = ?',
                [req.body.new_email, req.session.userid], (err, rows, fields) => {
                    if (err) console.log(err);
                    else {
                        req.flash('success', 'Email has been successfully changed');
                        return res.redirect('/account');
                    }
                });
            }
        }
    });
})

// router.post('/firstname', (req, res) => {
//     connection.query('SELECT lastname FROM users WHERE lastname = ?', [req.body.old_lastname], (err, rows, fields) => {
//         if (err) console.log(err);
//         else if (!rows[0]) {
//             req.flash('error', 'This email has not been registed, please comfirm');
//             return res.redirect('/account');
//         }
//         else{
//             if(req.body.new_email != req.body.new_email_repeat){
//                 req.flash('error', 'new email mismatch, try agin');
//                 return res.redirect('/account');
//             }
//             else{
//                 connection.query('UPDATE users SET email = ? Where id_user = ?',
//                 [req.body.new_email, req.session.userid], (err, rows, fields) => {
//                     if (err) console.log(err);
//                     else {
//                         req.flash('success', 'Email has been successfully changed');
//                         return res.redirect('/');
//                     }
//                 });
//             }
//         }
//     });
// })

// router.post('/lastname', (req, res) => {
//     connection.query('SELECT email FROM users WHERE email = ?', [req.body.old_email], (err, rows, fields) => {
//         if (err) console.log(err);
//         else if (!rows[0]) {
//             req.flash('error', 'This email has not been registed, please comfirm');
//             return res.redirect('/account');
//         }
//         else{
//             if(req.body.new_email != req.body.new_email_repeat){
//                 req.flash('error', 'new email mismatch, try agin');
//                 return res.redirect('/account');
//             }
//             else{
//                 connection.query('UPDATE users SET email = ? Where id_user = ?',
//                 [req.body.new_email, req.session.userid], (err, rows, fields) => {
//                     if (err) console.log(err);
//                     else {
//                         req.flash('success', 'Email has been successfully changed');
//                         return res.redirect('/');
//                     }
//                 });
//             }
//         }
//     });
// })


module.exports = router;