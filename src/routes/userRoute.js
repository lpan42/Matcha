const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//connect 
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);

//getInfo
router.route('/account/:userid').get(userController.getAccount);
router.route('/profile/:userid').get(userController.getProfile);
router.route('/notif/unread/:userid').get(userController.getUnreadNotif);
router.route('/notif/read/:notifid').get(userController.readNotif);
router.route('/history/:userid').get(userController.getHistory);

//modify
    //account
router.route('/modify/email/:userid').post(userController.modifyEmail);
router.route('/modify/firstname/:userid').post(userController.modifyFirstname);
router.route('/modify/lastname/:userid').post(userController.modifyLastname);
router.route('/modify/profile/:userid').post(userController.modifyProfile);
    
    //profile
router.route('/modify/interest/add/:userid').post(userController.addInterest);
router.route('/modify/interest/delete/:userid').post(userController.deleteInterest);
router.route('/like/:userid').post(userController.likeProfile);
router.route('/unlike/:userid').post(userController.unlikeProfile);
 
module.exports = router;