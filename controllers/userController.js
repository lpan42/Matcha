const userModel = require('../models/user');
const session = require('express-session');

module.exports = {
    renderRegister: (req, res) => {
        if (req.session.userid) {
            res.redirect('/user/register');
        }
        else {
            res.render('register', {
                title: 'register',
                error: req.flash('error'),
                success: req.flash('success'),
                user: req.session
            });
        }
    },

    register: (req, res) => {
        userModel.verifyExistEmail(req.body.email, (err, result) => {
            if(err){
                res.send(err);
            }
            else if(result.length){
                req.flash('error', 'This email has been taken');
                return  res.redirect('/user/register');
            }
            else{
                userModel.verifyExistUsername(req.body.username, (err, result) => {
                    if(err){
                        res.send(err);
                    }
                    else if(result.length){
                        req.flash('error', 'This username has been taken');
                        return  res.redirect('/user/register');
                    }
                    else{
                        userModel.createNewUser(req.body, (err, result) => {
                            if(err){
                                res.send(err);
                            }
                            else{
                                req.flash('success', 'user created, you may login now');
                                return res.redirect('/user/login');
                            }
                        })
                    }
                });
            }
        });
    },

    renderLogin: (req, res) => {
        if (req.session.userid) {
            res.redirect('/user/register');
        }
        else {
            res.render('login', {
                title: 'login',
                error: req.flash('error'),
                success: req.flash('success'),
                user: req.session
            });
        }
    },

    login: (req, res) => {
        userModel.login(req.body, (err, result) => {
            if(err){
                res.send(err);
            }
            switch(result){
                case 'User does not exit, please create an account first':
                    req.flash('error', result);
                    return res.redirect('/user/register');
                case 'Your accunt has not been actived, check your email':
                    req.flash('error', result);
                    return res.redirect('/user/login');
                case 'password unmatched, try again':
                    req.flash('error', result);
                    return res.redirect('/user/login');
                default:
                    req.session.userid = result[0].id_user;
                    req.session.username = result[0].username;
                    req.session.firstname = result[0].firstname;
                    req.session.lastname = result[0].lastname;
                    req.flash('success', 'You have successfully logged in');
                    return res.redirect('/');
            }
        });
    }
}