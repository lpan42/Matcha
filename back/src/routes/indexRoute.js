const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require('../middleware/auth');

router.route('/getsuggestions').get(auth, indexController.getSuggestions);
router.route('/search/:searchUserInput').get(auth, indexController.searchUser);
router.route('/filteruser').post(auth, indexController.filterUser);

module.exports = router;