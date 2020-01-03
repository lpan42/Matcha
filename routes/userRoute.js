const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.route('/register')
    .post(userController.register);

router.route('/login')
    .post(userController.login);

router.route('/logout')
    .get(userController.logout);

router.route('/account/:userid')
    .get(userController.getAccount);

router.route('/modify/email/:userid')
    .post(userController.modify_email);

router.route('/modify/firstname/:userid')
    .post(userController.modify_firstname);

router.route('/modify/lastname/:userid')
    .post(userController.modify_lastname);
   
router.route('/modify/profile/:userid')
    .post(userController.modify_profile);


router.route('/profile/:userid')
    .get(userController.getProfile);

module.exports = router;