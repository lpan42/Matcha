const userModel = require('../models/user');
const session = require('express-session');

module.exports = {
    renderRegister: (req, res) => {
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
    },

    register: (req, res) => {
        userModel.verifyExistEmail(req.body.email, (err, result) => {
            if(err) throw new Error(err);
            else if(result.length){
                req.flash('error', 'This email has been taken');
                return  res.redirect('/');
            }
            else{
                userModel.verifyExistUsername(req.body.username, (err, result) => {
                    if(err) throw new Error(err);
                    else if(result.length){
                        req.flash('error', 'This username has been taken');
                        return  res.redirect('/');
                    }
                    else{
                        userModel.createNewUser(req.body, (err) => {
                            if(err) throw new Error(err);
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
    },

    login: (req, res) => {
        userModel.login(req.body, (err, result) => {
            if(err) throw new Error(err);
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
                    console.log('session created');
                    req.flash('success', 'You have successfully logged in');
                    return res.redirect('/');
            }
        });
    },

    logout: (req, res) => {
        if (!req.session.userid) {
            return res.redirect('/');
        }
        userModel.logout(req.session.userid, (err) => {
            if(err) throw new Error(err);
            else{
                req.session.destroy();
                console.log('Session destroyed');
                res.redirect('/');
            }
        });
    },

    renderAccount: (req, res) => {
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
    },

    changeEmail: (req, res) => {
        if(req.body.new_email.toLowerCase() != req.body.new_email_repeat.toLowerCase()){
            req.flash('error', 'new email mismatch, try again');
            return res.redirect('/user/account');
        }
        let data = req.body;
        data.userid = req.session.userid;
        userModel.changeEmail(data, (err, result) => {
            if(err) throw new Error(err);
            switch(result){
                case 'Old email did not match, please comfirm':
                    req.flash('error', result);
                    return res.redirect('/user/account');
                default:
                    req.flash('success', 'Email has been successfully changed');
                    return res.redirect('/user/account');
            }
        });
    },

    changeFirstname: (req, res) => {
        if(req.body.new_firstname.toLowerCase() != req.body.new_firstname_repeat.toLowerCase()){
            req.flash('error', 'new firstname mismatch, try again');
            return res.redirect('/user/account');
        }
        let data = req.body;
        data.userid = req.session.userid;
        userModel.changeFirstname(data, (err, result) => {
            if(err){
                res.send(err);
            }
            switch(result){
                case 'Old firstname did not match, please comfirm':
                    req.flash('error', result);
                    return res.redirect('/user/account');
                default:
                    req.flash('success', 'Firstname has been successfully changed');
                    return res.redirect('/user/account');
            }
        });
    },

    changeLastname: (req, res) => {
        if(req.body.new_lastname.toLowerCase() != req.body.new_lastname_repeat.toLowerCase()){
            req.flash('error', 'new lastname mismatch, try again');
            return res.redirect('/user/account');
        }
        let data = req.body;
        data.userid = req.session.userid;
        userModel.changeLastname(data, (err, result) => {
            if(err) throw new Error(err);
            switch(result){
                case 'Old lastname did not match, please comfirm':
                    req.flash('error', result);
                    return res.redirect('/user/account');
                default:
                    req.flash('success', 'Lastname has been successfully changed');
                    return res.redirect('/user/account');
            }
        });
    }
}