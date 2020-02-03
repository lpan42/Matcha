const userModel = require('../models/user');

export async function getAccount (req, res)
{
    const result = await userModel.getUserInfoById(req.params.userid);
    if(result.err){
        return res.status(400).json({ error: result.err });
    }
    else {
        return res.status(200).json({
            data: result
        });
    }
}

export async function register (req, res)
{
    const check_email = await userModel.verifyExistEmail(req.body.email);
    if(check_email){
        return res.status(400).json({ error: check_email.err });
    }
    else{
        const check_username = await userModel.verifyExistUsername(req.body.username);
        if(check_username){
            return res.status(400).json({ error: check_username.err });
        }
        else{
            const result = userModel.createNewUser(req.body);
            if(result.err){err
                return res.status(400).json({ error: result.err });
            }
            else return res.status(200).json({ message: 'Successfully register, you may log in' });
        }
    }
}

export async function login (req, res)
{
    const result = await userModel.login(req.body);
    if(result.err){
        return res.status(400).json({ error: result.err });
    }
    else {
        return res.status(200).json({
            message: 'sucessfully login',
            data: result
        });
    }
}

export async function logout (req, res)
{
    const result = await userModel.logout(req.body.userid);
    if(result){
        return res.status(400).json({ error: result.err });
    }
    else {
        return res.status(200).json({ message: 'user offline' });
    }
}

export async function modify_email (req, res)
{
    let data = req.body;
    data.userid = req.params.userid;
    const result = await userModel.modify_email(data);
    if(result)
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Email has been successfully updated' });
}

export async function modify_firstname (req, res)
{
    let data = req.body;
    data.userid = req.params.userid;
    const result = await userModel.modify_firstname(data);
    if (result)
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Firstname has been successfully updated' });
}


export async function modify_lastname (req, res)
{
    let data = req.body;
    data.userid = req.params.userid;
    const result = await userModel.modify_lastname(data);
    if (result)
        return res.status(400).json({ error: result.err });
    else
        return res.status(200).json({ message: 'Lastname has been successfully updated' });
}

export async function getProfile (req, res)
{
    const result = await userModel.getProfileInfoById(req.params.userid);
    if (result.err)
        return res.status(400).json({ error: result.err });
    else {
        const interests = await userModel.getInterestsById(req.params.userid);
        if (interests.err)
            return res.status(400).json({ error: interests.err });
        else {
            result.interests = interests;
        }
    }
    if (req.body.visitorid != req.params.userid) {
        let data = {};
        data.id_user = req.params.userid;
        data.id_visitor = req.body.visitorid;
        const visit = await userModel.visitPlusOne(data);
        if (visit.err) return res.status(400).json({ error: err });
        else {
            let data = {
                notification: 'visit',
                id_link: id_link
            }
            userModel.addNotif(data, (err) => {
                if (err) return res.status(400).json({ error: err });
            })
        }
    }
    return res.status(200).json({
        data: result
    })
}

export async function modify_profile (req, res)
{
    let data = req.body;
    data.id_user = req.params.userid;
    userModel.modify_profile(data, (err) => {
        if (err)
            return res.status(400).json({ error: err });
        else
            return res.status(200).json({ message: 'Profile has been successfully updated' });
    })
}