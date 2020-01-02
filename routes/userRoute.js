const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.route('/register')
    .get(userController.renderRegister)
    .post(userController.register);

router.route('/login')
    .get(userController.renderLogin)
    .post(userController.login);

router.route('/logout')
    .get(userController.logout);

router.route('/account')
    .get(userController.renderAccount);

router.route('/account/email')
    .post(userController.changeEmail);

router.route('/account/firstname')
    .post(userController.changeFirstname);

router.route('/account/lastname')
    .post(userController.changeLastname);

    
module.exports = router;