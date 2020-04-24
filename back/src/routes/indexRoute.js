const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require('../middleware/auth');

router.route('/getsuggestions').get(auth, indexController.getSuggestions);

module.exports = router;