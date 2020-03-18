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

router.route('/notif/get_notif').get(auth, userController.getNotif);
router.route('/notif/read/:id_notif').get(auth, userController.readNotif);
router.route('/history/:userid').get(userController.getHistory);

router.route('/checklike/:userid').get(auth,userController.checkLike);
router.route('/like/:userid').post(auth, userController.likeProfile);
router.route('/unlike/:userid').post(auth, userController.unlikeProfile);

//modify
router.route('/modify/account').post(auth, userController.modifyAccount);
router.route('/modify/profile').post(auth, userController.modifyProfile);
router.route('/modify/interests').post(auth, userController.modifyInterests);


module.exports = router;