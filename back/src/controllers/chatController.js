const userModel = require('../models/user');
const chatModel = require('../models/chat');

export async function getMessages(req, res){
    const checkUser = await chatModel.getUserByChatroomId(req.params.chatroomid);
    if(checkUser[0]){
        if(req.userid != checkUser[0].id_user_1 && req.userid != checkUser[0].id_user_2){
            return res.status(400).json({ error: "The chatroom is not belong to you, you dont have the right" });
        }
        else{
            const result = await chatModel.getMessageByChatroomId(req.params.chatroomid);
            return res.status(200).json({
                data: result
            });
        }
    }
   else{
       return res.status(400).json({ error: "Chatroom does not exist" });
   }
}

export async function getFriendsList(req,res){
    const result = await chatModel.getAllConnectedByUserid(req.userid);
    return res.status(200).json({
        data: result
    });
}

export async function addMessage(req, res){
    let data = {
        id_chatroom:req.params.chatroomid, 
        id_sender: req.body.senderid,
        message: req.body.message
    } 
    const checkUser = await chatModel.getUserByChatroomId(req.params.chatroomid);
    if (typeof(checkUser.err) !== 'undefined') {
        return res.status(400).json({ error: checkUser.err });
    }
    else if(req.body.senderid != checkUser[0].id_user_1 && req.body.senderid != checkUser[0].id_user_2){
        return res.status(400).json({ error: "The chatroom is not belong to you, you dont have the right" });
    }
    else{
        const id_message = await chatModel.addMessage(data);
        if (typeof(id_message.err) !== 'undefined') {
            return res.status(400).json({ error: id_message.err });
        } 
        else {
            let id_user;
            if(req.body.senderid != checkUser[0].id_user_1)
                id_user = checkUser[0].id_user_1;
            else
                id_user = checkUser[0].id_user_2;
            let notifData = {
                notification: 'messages',
                id_user: id_user,
                id_sender: req.body.senderid,
                id_link: id_message
            }
            const addNotif = await userModel.addNotif(notifData);
            if (typeof(addNotif) !== 'undefined') {
                return res.status(400).json({ error: addNotif.err });
            }
            else{
                return res.status(200).json({ success: 'Add one new message'});
            }
        }
    }
}