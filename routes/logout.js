const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res) => {
    console.log('Destroying session');
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;