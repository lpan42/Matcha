const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//connect 
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/auth').get(auth, userController.authUser);
router.route('/logout').get(auth, userController.logout);

//getInfo
router.route('/account/:userid').get(auth, userController.getAccount);
router.route('/profile/:userid').get(auth, userController.getProfile);
router.route('/interests_list').get(userController.getInterestsList);
router.route('/notif/unread/:userid').get(userController.getUnreadNotif);
router.route('/notif/read/:notifid').get(userController.readNotif);
router.route('/history/:userid').get(userController.getHistory);

//modify
router.route('/modify/account').post(auth, userController.modifyAccount);
router.route('/modify/profile').post(auth, userController.modifyProfile);
router.route('/modify/interests').post(auth, userController.modifyInterests);

router.route('/like/:userid').post(userController.likeProfile);
router.route('/unlike/:userid').post(userController.unlikeProfile);

module.exports = router;