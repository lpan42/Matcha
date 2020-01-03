const index = require('../models/index');
const session = require('express-session');

module.exports = {
    index: (req, res) => { res.render('index');}
}