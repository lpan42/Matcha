const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.route('/friendslist').get(auth, chatController.getFriendsList);
// router.route('/chatroom/:chatroomid').get(auth, chatController.getMessages);
// router.route('/newmessage/:chatroomid').post(chatController.addMessage);

module.exports = router;