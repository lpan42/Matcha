const index = require('../models/index');
const session = require('express-session');

module.exports = {
    index: (req, res) => {
        if (req.session.userid) {
            res.render('index', {
                title: 'Matcha',
                error: req.flash('error'),
                success: req.flash('success'),
                user: req.session
            });
        } else {
            res.redirect('/user/register');
        }
    }
}