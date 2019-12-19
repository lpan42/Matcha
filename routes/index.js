const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res) => {
    // req.session.userid = "test";
    // if (req.session.userid) {
    //     console.log(req.session.userid);
    // } else {
    res.redirect('/register');
    // }
});

module.exports = router;