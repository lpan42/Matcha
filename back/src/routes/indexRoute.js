const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require('../middleware/auth');

module.exports = router;