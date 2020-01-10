const userModel = require('../models/user');

module.exports = {
    renderRegister: (req, res) => { res.render('register'); },
    renderLogin: (req, res) => { res.render('login'); },
    renderAccount: (req, res) => { res.render('account'); },

    getAccount: (req, res) => {
        userModel.getUserInfoById(req.params.userid, (err, result) => {
            if (err) return res.status(400).json({ error: err });
            else {
                return res.status(200).json({
                    data: result
                });
            }
        });
    },

    register: (req, res) => {
        userModel.verifyExistEmail(req.body.email, (err) => {
            if (err) return res.status(400).json({ error: err });
            else {
                userModel.verifyExistUsername(req.body.username, (err) => {
                    if (err) return res.status(400).json({ error: err });
                    else {
                        userModel.createNewUser(req.body, (err) => {
                            if (err) return res.status(400).json({ error: err });
                            else return res.status(200).json({ message: 'Successfully register, you may log in' });
                        });
                    }
                });
            }
        })
    },

    login: (req, res) => {
        console.log(req.body);
        userModel.login(req.body, (err, result) => {
            if (err) return res.status(400).json({ error: err });
            else {
                return res.status(200).json({
                    message: 'sucessfully login',
                    data: result
                });
            }
        });
    },

    logout: (req, res) => {
        userModel.logout(req.body.userid, (err) => {
            if (err) return res.status(400).json({ error: err });
            else {
                return res.status(200).json({ message: 'user offline' });
            }
        });
    },

    modify_email: (req, res) => {
        let data = req.body;
        data.userid = req.params.userid;
        userModel.modify_email(data, (err) => {
            if (err)
                return res.status(400).json({ error: err });
            else
                return res.status(200).json({ message: 'Email has been successfully updated' });
        });
    },

    modify_firstname: (req, res) => {
        let data = req.body;
        data.userid = req.params.userid;
        userModel.modify_firstname(data, (err) => {
            if (err)
                return res.status(400).json({ error: err });
            else
                return res.status(200).json({ message: 'Firstname has been successfully updated' });
        });
    },

    modify_lastname: (req, res) => {
        let data = req.body;
        data.userid = req.params.userid;
        userModel.modify_lastname(data, (err) => {
            if (err)
                return res.status(400).json({ error: err });
            else
                return res.status(200).json({ message: 'Lastname has been successfully updated' });
        });
    },

    getProfile: (req, res) => {
        userModel.getProfileInfoById(req.params.userid, (err, profile) => {
            if (err) return res.status(400).json({ error: err });
            else {
                let result = profile[0];
                userModel.getInterestsById(req.params.userid, (err, interests) => {
                    if (err) return res.status(400).json({ error: err });
                    else {
                        result.interests = interests;
                    }
                });
                if (req.body.visitorid != req.params.userid) {
                    let data = {};
                    data.id_user = req.params.userid;
                    data.id_visitor = req.body.visitorid;
                    userModel.visitPlusOne(data, (err, id_link) => {
                        if (err) return res.status(400).json({ error: err });
                        else {
                            let data = {
                                notification: 'visit',
                                id_link: id_link
                            }
                            userModel.addNotif(data, (err) => {
                                if (err) return res.status(400).json({ error: err });
                            })
                        }
                    });
                }
                return res.status(200).json({
                    data: result
                })
            }
        });

    },

    modify_profile: (req, res) => {
        let data = req.body;
        data.id_user = req.params.userid;
        userModel.modify_profile(data, (err) => {
            if (err)
                return res.status(400).json({ error: err });
            else
                return res.status(200).json({ message: 'Profile has been successfully updated' });
        })
    }

}