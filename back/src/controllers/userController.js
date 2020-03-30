const userModel = require('../models/user');
const indexModel = require('../models/index');
const jwtModel = require('../models/jwt');
const crypto = require('crypto');

export async function getAccount(req, res) {
    const result = await userModel.getUserInfoById(req.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function register(req, res) {
    const check_email = await userModel.verifyExistEmail(req.body.email);
    if (typeof(check_email) !== 'undefined') {
        return res.status(400).json({ error: check_email.err });
    } else {
        const check_username = await userModel.verifyExistUsername(req.body.username);
        if (typeof(check_username) !== 'undefined') {
            return res.status(400).json({ error: check_username.err });
        } else {
            await userModel.createNewUser(req.body);
            return res.status(200).json({ 
                success: 'Successfully register, you may log in',
            });
        }
    }
}

export async function login(req, res) {
    const result = await userModel.login(req.body);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        const token = jwtModel.generateToken(result.userid, result.username);
        return res.status(200).json({
            success: 'sucessfully login',
            data: result,
            token: token
        });
    }
}
export async function authUser(req, res){
    const result = await userModel.getUserInfoById(req.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result,
        });
    }
}

export async function logout(req, res) {
    await userModel.logout(req.userid);
    return res.status(200).json({ success: 'user offline' });
}

export async function modifyAccount(req,res){
    
    let data = {
        email: req.body.data.email,
        firstname: req.body.data.firstname,
        lastname: req.body.data.lastname,
    }
    const result = await userModel.modifyAccount(data, req.userid);
    if (typeof(result) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ success: 'Account has been successfully updated' });
}

export async function getProfile(req, res) {
    const getProfile = await userModel.getProfileInfoById(req.params.userid);
    if(getProfile.err)
    {
        if (req.userid != req.params.userid){
           return res.status(400).json({error: getProfile.err});
        }else{
            let createProfile = await userModel.getCreateProfile(req.userid);
                createProfile.interests = [];
           return res.status(200).json({ 
               data: createProfile
            })
        }
    }
    else{
        if (req.userid != req.params.userid) {
            let data = {
                notification: 'visits',
                id_user: req.params.userid,
                id_sender: req.userid
            }
            await userModel.addNotif(data);
            await userModel.addFame(1, data.id_user);
        }
        const result = await userModel.getProfileInfoById(req.params.userid);
        if (typeof(result.err) !== 'undefined') {
            return res.status(400).json({ error: result.err });
        } else {
            const interests = await userModel.getInterestsById(req.params.userid);
            result.interests = interests;
            const pictures = await userModel.getPictureById(req.params.userid);
            result.pictures = pictures;
        }
        return res.status(200).json({
            data: result
        })
    }
}

export async function modifyProfile(req, res) {
    let data = req.body;
    data.id_user = req.userid;
    await userModel.modify_profile(data);
    return res.status(200).json({ success: 'Profile has been successfully updated' });
}

export async function modifyInterests(req, res) {
    let data = {};
    data.id_user = req.userid;
    data.interest = req.body;
    await userModel.modifyInterests(data);
    res.status(200).json({ success: 'Profile has been successfully updated' });
}

export async function getNotif(req, res) {
    const result = await userModel.getNotif(req.userid);
    return res.status(200).json({
        data: result
    });
}

export async function readNotif(req, res) {
    await userModel.readNotif(req.params.id_notif);
    const result = await userModel.getNotif(req.userid);
    return res.status(200).json({
        data: result
    });
}

export async function getHistory(req, res){
    const result = await userModel.getHistory(req.params.userid);
    return res.status(200).json({
        data: result
    });
}

export async function checkLike(req,res){
    const result = await userModel.checkLike(req.params.userid, req.userid);
    let like = false;
    let connected = false;
    if(result[0]){
        like = true;
        const checklikeback = await userModel.checkLike(req.userid, req.params.userid);
        if(checklikeback[0]){
            connected = true;
        }
    }
    return res.status(200).json({
        like,
        connected
    });
}

export async function likeProfile(req,res) {
    if (req.userid != req.params.userid) {
        let data = {
            notification: 'likes',
            id_user: req.params.userid,
            id_sender: req.userid
        }
        const checklike = await userModel.checkLike(data.id_user, data.id_sender);
        if(checklike[0]){
            return res.status(200).json({ 
                connected: false,
                success: 'You have liked this user before'});
        }
        else{
            await userModel.addLike(data.id_user, data.id_sender);
            await userModel.addFame(5, data.id_user);
            await userModel.addNotif(data);
            const checklikeback = await userModel.checkLike(data.id_sender, data.id_user);
            if(checklikeback[0]){
                await indexModel.createChatroom(data.id_sender, data.id_user);
                return res.status(200).json({ 
                    connected: true,
                    success: 'This user also likes you, now you can chat'});
            }
            else return res.status(200).json({ 
                connected: false,
                success: 'liked'});
        }
    }
    else{
        return res.status(400).json({ error: 'You cannot like yourself'});
    }
}

export async function unlikeProfile(req,res) {
    if (req.userid != req.params.userid) {
        let data = {
            notification: 'unlikes',
            id_user: req.params.userid,
            id_sender: req.userid
        }
        const checklike = await userModel.checkLike(data.id_user, data.id_sender);
        if(!checklike[0]){
            return res.status(400).json({ error: 'You have not liked this user before'});
        }
        else{
            await userModel.unlike(data.id_user, data.id_sender);
            await userModel.addFame(-5, data.id_user);
            await userModel.addNotif(data);
            const checklikeback = await userModel.checkLike(data.id_sender, data.id_user);
            if(checklikeback[0]){// means they are connected user
                const chatroom = await indexModel.getChatroomId(data.id_sender, data.id_user);
                await indexModel.unlinkChat(chatroom.id_chatroom);
                return res.status(200).json({
                    connected: false,
                    success: 'You unlike this user, you are not connected anymore, all your previous messages has been destoryed'});
            }
            else
                return res.status(200).json({
                    connected: false,
                    success: 'You unlike this user'});
        }
    }
}

export async function getInterestsList(req,res) {
    const result = await userModel.getInterestsList();
    return res.status(200).json({
        data: result
    });
}

export async function uploadAvatar(req,res) {
    if(req.files == null){
        return res.status(400).json({ error: 'No file was uploaded'});
    }
    const file = req.files.file;
    const filename = req.userid + crypto.randomBytes(5).toString('hex');
    file.mv(`../front/public/images/${filename}`, err => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
    });
    await userModel.uploadAvatar(req.userid, filename);
    return res.status(200).json({
        success: "You avatar has been updated successfully"
    });
}

export async function modifyPictures(req, res){
    const getCurrent = await userModel.getPictureById(req.userid);//must have previous pics
    // if(req.body.length){
        for(let i = 0; i < getCurrent.length; i++) {
            let check = false;
            for(let ii = 0; ii < req.body.length; ii++){
                if(getCurrent[i].path === req.body[ii].path)
                {
                    check = true;
                    break ;
                }
            }
            if(check === false){
                await userModel.deletePics(getCurrent[i].path);
            }
        }
    // }
    return res.status(200);
}

export async function uploadPictures(req, res){
    if(req.files == null){
        return res.status(400).json({ error: 'No file was uploaded'});
    }
    const files = req.files.file;
    console.log(files)
    for(let i = 0; i < files.length; i++){
        const filename = req.userid + crypto.randomBytes(5).toString('hex');
        files[i].mv(`../front/public/images/${filename}`, err => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
        });
        await userModel.uploadPics(req.userid, filename);
    }
    return res.status(200);
}
//get chatroom and message
