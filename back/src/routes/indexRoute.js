const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//chat
router.route('/chat/chatroom/:chatroomid').get(indexController.getMessage);
router.route('/chat/connected/:userid').get(indexController.getAllConnected);
router.route('/chat/newmessage/:chatroomid').post(indexController.addMessage);
module.exports = router;