import * as userModel from '../models/user';

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
    if (typeof(check_email.err) !== 'undefined') {
        return res.status(400).json({ error: check_email.err });
    } else {
        const check_username = await userModel.verifyExistUsername(req.body.username);
        if (typeof(check_username.err) !== 'undefined') {
            return res.status(400).json({ error: check_username.err });
        } else {
            const result = userModel.createNewUser(req.body);
            if (typeof(result) !== 'undefined') {
                return res.status(400).json({ error: result.err });
            } else return res.status(200).json({ message: 'Successfully register, you may log in' });
        }
    }
}

export async function login(req, res) {
    const result = await userModel.login(req.body);
    if (typeof(result.err) !== 'undefined') {
        return res.status(400).json({ error: result.err });
    } else {
        return res.status(200).json({
            message: 'sucessfully login',
            data: result
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
    if (req.body.visitorid != req.params.userid) {
        let data = {
            notification: 'visits',
            id_user: req.params.userid,
            id_sender: req.body.visitorid
        }
        const addnotif = await userModel.addNotif(data);
        if (typeof(addnotif) !== 'undefined') {
            return res.status(400).json({ error: addnotif.err });
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
        const checklike = await userModel.checkLike(data);
        if (typeof(checkLike.err) !== 'undefined') {
            return res.status(400).json({ error: result.err });
        }
        else if(checkLike[0]){
            return res.status(200).json({ message: 'You have liked this user before'});
        }
        else{
            const addlikes = await userModel.addLikes
            const addnotif = await userModel.addNotif(data);
            if (typeof(addnotif) !== 'undefined') {
                return res.status(400).json({ error: addnotif.err });
            }
            else {
                const result = await userModel.checkLikeBack(req.params.userid, req.body.likerid);
                if (typeof(result.err) !== 'undefined') {
                    return res.status(400).json({ error: result.err });
                }
                return res.status(200).json({ message: 'liked'});
            }
        }
    }
}