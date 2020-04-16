const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.route('/friendslist').get(auth, chatController.getFriendsList);
router.route('/getunread').get(auth, chatController.getUnread);
router.route('/read/:id_chatroom').post(auth, chatController.setMessageReaded);

module.exports = router;