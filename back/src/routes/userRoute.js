const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//connect 
router.route('/register').post(userController.register);
router.route('/active/:active_link').post(userController.active);
router.route('/login').post(userController.login);
router.route('/auth').get(auth, userController.authUser);
router.route('/resetpwd/:input').get(userController.resetpwd);
router.route('/verifypwdlink/:resetpwd_link').get(userController.verifyPwdLink);
router.route('/updatepwd').post(userController.updatepwd);
router.route('/logout').get(auth, userController.logout);

//getInfo
router.route('/account/:userid').get(auth, userController.getAccount);
router.route('/profile/:userid').get(auth, userController.getProfile);
router.route('/interests_list').get(userController.getInterestsList);

//notification
router.route('/notif/read/:id_notif').get(auth, userController.readNotif);
router.route('/notif/allreaded').get(auth,userController.setAllReaded);
router.route('/checklike/:userid').get(auth, userController.checkLike);
router.route('/like/:userid').post(auth, userController.likeProfile);
router.route('/unlike/:userid').post(auth, userController.unlikeProfile);
router.route('/block/:userid').post(auth, userController.blockUser);
router.route('/reportfake/:userid').post(auth, userController.reportFake);
router.route('/blocklist').get(auth, userController.getBlockList);
router.route('/likelist').get(auth, userController.getLikeList);
router.route('/visitlist').get(auth, userController.getVisitList);
router.route('/unblock/:blockuserid').post(auth, userController.unBlockUser);

//modify
router.route('/modify/account').post(auth, userController.modifyAccount);
router.route('/modify/profile').post(auth, userController.modifyProfile);
router.route('/modify/interests').post(auth, userController.modifyInterests);
router.route('/modify/pictures').post(auth, userController.modifyPictures);

router.route('/upload/avatar').post(auth,userController.uploadAvatar);
router.route('/upload/pictures').post(auth, userController.uploadPictures);

module.exports = router;