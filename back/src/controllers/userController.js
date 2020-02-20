const userModel = require('../models/user');
const indexModel = require('../models/index');
const jwtModel = require('../models/jwt');

export async function getAccount(req, res) {
    const result = await userModel.getUserInfoById(req.params.userid);
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
            const result = await userModel.createNewUser(req.body);
            if (typeof(result.err) !== 'undefined') {
                return res.status(400).json({ error: result.err });
            } else{
                return res.status(200).json({ 
                    message: 'Successfully register, you may log in',
                });
            }
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
            message: 'sucessfully login',
            data: result,
            token: token
        });
    }
}

export async function logout(req, res) {
    const result = await userModel.logout(req.body.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({ message: 'user offline' });
    }
}

export async function modifyEmail(req, res) {
    let data = req.body;
    data.userid = req.params.userid;
    const result = await userModel.modify_email(data);
    if (typeof(result.err) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Email has been successfully updated' });
}

export async function modifyFirstname(req, res) {
    let data = req.body;
    data.userid = req.params.userid;
    const result = await userModel.modify_firstname(data);
    if (typeof(result) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Firstname has been successfully updated' });
}


export async function modifyLastname(req, res) {
    let data = req.body;
    data.userid = req.params.userid;
    const result = await userModel.modify_lastname(data);
    if (typeof(result.err) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Lastname has been successfully updated' });
}

export async function getProfile(req, res) {
    //req.userid is from the token, verified by middleware.auth
    if (req.userid != req.params.userid) {
        let data = {
            notification: 'visits',
            id_user: req.params.userid,
            id_sender: req.body.userid
        }
        const addNotif = await userModel.addNotif(data);
        if (typeof(addNotif) !== 'undefined') {
            return res.status(400).json({ error: addNotif.err });
        }
        else{
            const addFame = await userModel.addFame(1, data.id_user);
            if(typeof(addFame) !== 'undefined') {
                return res.status(400).json({ error: addFame.err });
            }
        }
    }
    const result = await userModel.getProfileInfoById(req.params.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        const interests = await userModel.getInterestsById(req.params.userid);
        if (typeof(interests.err) !== 'undefined')
            return res.status(400).json({ error: interests.err });
        else {
            result.interests = interests;
        }
    }
    return res.status(200).json({
        data: result
    })
}

export async function modifyProfile(req, res) {
    let data = req.body;
    data.id_user = req.params.userid;
    const result = await userModel.modify_profile(data);
    if (typeof(result) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Profile has been successfully updated' });
}

export async function deleteInterest(req, res) {
    const result = await userModel.delete_interest(req.params.userid);
    if (typeof(result) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'success' });
}

export async function addInterest(req, res) {
    let data = {};
    data.id_user = req.params.userid;
    data.id_interest = req.body.id_interest;
    const result = await userModel.add_interest(data);
    if (typeof(result) !== 'undefined')
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Profile has been successfully updated' });
}

export async function getUnreadNotif(req, res) {
    const result = await userModel.getUnreadNotif(req.params.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function readNotif(req, res) {
    const result = await userModel.getOneNotif(req.params.notifid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function getHistory(req, res){
    const result = await userModel.getHistory(req.params.userid);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function likeProfile(req,res) {
    if (req.body.likerid != req.params.userid) {
        let data = {
            notification: 'likes',
            id_user: req.params.userid,
            id_sender: req.body.likerid
        }
        const checklike = await userModel.checkLike(data.id_user, data.id_sender);
        if (typeof(checklike.err) !== 'undefined') {
            return res.status(400).json({ error: checklike.err });
        }
        else if(checklike[0]){
            return res.status(200).json({ message: 'You have liked this user before'});
        }
        else{
            const addlike = await userModel.addLike(data.id_user, data.id_sender);
            if (typeof(addlike) !== 'undefined') {
                return res.status(400).json({ error: addlike.err });
            }
            else {
                const addFame = await userModel.addFame(5, data.id_user);
                if(typeof(addFame) !== 'undefined') {
                    return res.status(400).json({ error: addFame.err });
                }
                else{
                    const addNotif = await userModel.addNotif(data);
                    if (typeof(addNotif) !== 'undefined') {
                        return res.status(400).json({ error: addNotif.err });
                    }
                    else {
                        const checklikeback = await userModel.checkLike(data.id_sender, data.id_user);
                        if (typeof(checklikeback.err) !== 'undefined') {
                            return res.status(400).json({ error: checklikeback.err });
                        }
                        if(checklikeback[0]){
                            const chatroom = await indexModel.createChatroom(data.id_sender, data.id_user);
                            if (typeof(chatroom) !== 'undefined') {
                                return res.status(400).json({ error: chatroom.err });
                            }
                            return res.status(200).json({ message: 'This user also likes you, now you can chat'});
                        }
                        else return res.status(200).json({ message: 'liked'});
                    }
                }
            }
        }
    }
    else{
        return res.status(400).json({ error: 'You cannot like yourself'});
    }
}

export async function unlikeProfile(req,res) {
    if (req.body.unlikerid != req.params.userid) {
        let data = {
            notification: 'unlikes',
            id_user: req.params.userid,
            id_sender: req.body.unlikerid
        }
        const checklike = await userModel.checkLike(data.id_user, data.id_sender);
        if (typeof(checklike.err) !== 'undefined') {
            return res.status(400).json({ error: checklike.err });
        }
        else if(!checklike[0]){
            return res.status(400).json({ error: 'You have not liked this user before'});
        }
        else{
            const unlike = await userModel.unlike(data.id_user, data.id_sender);
            if (typeof(unlike) !== 'undefined') {
                return res.status(400).json({ error: unlike.err });
            }
            else{
                const minFame = await userModel.addFame(-5, data.id_user);
                if (typeof(minFame) !== 'undefined') {
                    return res.status(400).json({ error: minFame.err });
                }
                else{
                    const addNotif = await userModel.addNotif(data);
                    if (typeof(addNotif) !== 'undefined') {
                        return res.status(400).json({ error: addNotif.err });
                    }
                    else{
                        const checklikeback = await userModel.checkLike(data.id_sender, data.id_user);
                        if (typeof(checklikeback.err) !== 'undefined') {
                            return res.status(400).json({ error: checklikeback.err });
                        }
                        else if(checklikeback[0]){// means they are connected user
                            const chatroom = await indexModel.getChatroomId(data.id_sender, data.id_user);
                            const unlinkChat = await indexModel.unlinkChat(chatroom.id_chatroom);
                            if (typeof(unlinkChat) !== 'undefined') {
                                return res.status(400).json({ error: unlinkChat.err });
                            }
                            else
                                return res.status(200).json({ message: 'You unlike this user, you are not connected anymore, all your previous messages has been destoryed'});
                        }
                        else
                            return res.status(200).json({ message: 'You unlike this user'});
                    }
                }
            }
        }
    }
}

//get chatroom and message
