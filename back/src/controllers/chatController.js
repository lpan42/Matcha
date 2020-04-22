const userModel = require('../models/user');
const chatModel = require('../models/chat');

export async function checkUserByChatroomId(id_chatroom, id_user){
    const checkUser = await chatModel.getUserByChatroomId(id_chatroom);
    if(!checkUser[0]){
        return { error: "Chatroom does not exist" };
    }
    if(id_user != checkUser[0].id_user_1 && id_user != checkUser[0].id_user_2){
        return { error: "The chatroom is not belong to you, you dont have the right" };
    }
    else{
        return { error: null };
    }
}
export async function getChatroomByUserid(req,res){
    const chatroomId = await chatModel.getChatroomId(req.userid, req.params.userid);
    return res.status(200).json({
        data: chatroomId
    });
}

export async function getUnread(userid){
    const result = await chatModel.getUnread(userid);
    return result;
}

export async function setMessageReaded(id_chatroom, userid){
    await chatModel.setMessageReaded(userid, id_chatroom);
}

export async function getMessages(id_chatroom){
    const result = await chatModel.getMessageByChatroomId(id_chatroom);
    return result;
}

export async function getFriendsList(req,res){
    const result = await chatModel.getAllConnectedByUserid(req.userid);
    return res.status(200).json({
        data: result
    });
}

export async function addMessage(id_chatroom, id_sender, newMessage){
    const checkUser = await chatModel.getUserByChatroomId(id_chatroom);
    let id_user;
    if(id_sender != checkUser[0].id_user_1)
        id_user = checkUser[0].id_user_1;
    else
        id_user = checkUser[0].id_user_2;
    let data = {
        id_chatroom:id_chatroom,
        id_sender: id_sender,
        id_user: id_user,
        message: newMessage
    } 
    await chatModel.addMessage(data);
    return data.id_user;
}