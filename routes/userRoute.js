const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.route('/register')
    .get(userController.renderRegister)
    .post(userController.register);

router.route('/login')
    .get(userController.renderLogin)
    .post(userController.login);

module.exports = router;