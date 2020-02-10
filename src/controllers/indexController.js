import * as userModel from '../models/user';
import * as indexModel from '../models/index';

export async function getMessage(req, res){
    const result = await indexModel.getMessageByChatroomId(req.params.chatroomid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function getAllConnected(req, res){
    const result = await indexModel.getAllConnectedByUserid(req.params.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function addMessage(req, res){
    let data = {
        id_chatroom:req.params.chatroomid, 
        id_sender: req.body.senderid,
        message: req.body.message
    }
    const id_message = await indexModel.addMessage(data);
    if (typeof(id_message.err) !== 'undefined') {
        return res.status(400).json({ error: id_message.err });
    } 
    // else {
    //     let notifData = {
    //         notification: 'messages',
    //         id_user: req.params.userid,
    //         id_sender: req.body.userid
    //     }
    //     const addNotif = await userModel.addNotif(notifData);
    //     if (typeof(addNotif) !== 'undefined') {
    //         return res.status(400).json({ error: addNotif.err });
    //     }
    //     else{
    //         return res.status(200).json({ message: 'Add one new message'});
    //     }
    // }
}