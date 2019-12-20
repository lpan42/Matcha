const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res) => {
    if (req.session.userid) {
        res.render('index', {
            title: 'Matcha',
            error: req.flash('error'),
            success: req.flash('success'),
            user: req.session
        });
    } else {
        res.redirect('/register');
    }
});

module.exports = router;