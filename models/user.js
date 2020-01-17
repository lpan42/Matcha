const connection = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment');

module.exports = {
    getUserInfoById: (userid, callback) => {
        connection.query('SELECT * FROM users WHERE id_user = ?', userid, (err, rows) => {
            if (err)
                callback(err, null);
            else if (!rows.length)
                callback('This user does not exist', null);
            else {
                const user = {
                    id: rows[0].id_user,
                    username: rows[0].username,
                    email: rows[0].email,
                    firstname: rows[0].firstname,
                    lastname: rows[0].lastname,
                };
                callback(null, user);
            }
        })
    },

    getProfileInfoById: (userid, callback) => {
        connection.query(
            `SELECT profiles.id_user, gender, birthday, sex_prefer, biography, location_lat, location_lon, picture, fame, username, firstname, lastname, last_login
            FROM profiles 
            INNER JOIN users on profiles.id_user = users.id_user
            WHERE profiles.id_user = ?`,
            userid, (err, rows) => {
                if (err)
                    callback(err, null);
                else if (!rows.length)
                    callback('This user profile does not exist', null);
                else {
                    callback(null, rows);
                }
            })
    },

    getInterestsById: (userid, callback) => {
        connection.query('SELECT id_interest FROM users_interests WHERE id_user = ?', userid, (err, rows) => {
            if (err)
                callback(err, null);
            else callback(null, rows);
        })
    },

    visitPlusOne: (data, callback) => {
        connection.query('INSERT INTO visits SET ?;', data, (err, rows) => {
            if (err) callback(err, null);
            else callback(null, rows.insertId);
        })
    },

    addNotif: (data, callback) => {

        connection.query('INSERT INTO notifications SET ?', data, (err) => {
            if (err) callback(err);
            else callback(null);
        })
    },

    verifyExistEmail: (email, callback) => {
        connection.query('SELECT email FROM users WHERE email = ?', email.toLowerCase(), (err, rows) => {
            if (err)
                callback(err);
            else if (rows.length)
                callback('This email has been taken');
            else callback(null);
        })
    },

    verifyExistUsername: (username, callback) => {
        connection.query('SELECT username FROM users WHERE username = ?', username.toLowerCase(), (err, rows) => {
            if (err)
                callback(err);
            else if (rows.length)
                callback('This username has been taken');
            else
                callback(null);
        })
    },

    createNewUser: (body, callback) => {
        const hash = bcrypt.hashSync(body.password, 10);
        const active_link = crypto.randomBytes(10).toString('hex');
        const data = {
            email: body.email.toLowerCase(),
            username: body.username.toLowerCase(),
            firstname: body.firstname.toLowerCase(),
            lastname: body.lastname.toLowerCase(),
            password: hash,
            active_link: active_link
        };
        connection.query('INSERT INTO users SET ?', data, (err) => {
            if (err)
                callback(err);
            else
                callback(null);
        });
    },

    login: (data, callback) => {
        connection.query('SELECT * FROM users WHERE username = ?', data.username.toLowerCase(), function(err, rows) {
            if (err)
                callback(err, null);
            else if (!rows[0])
                callback('User does not exit, please create an account first', null);
            else if (rows[0]) {
                if (!rows[0].active)
                    callback('Your accunt has not been actived, check your email', null);
                else if (!bcrypt.compareSync(data.password, rows[0].password)) {
                    callback('password unmatched, try again', null);
                } else {
                    const last_login = moment().format('Y-M-D H:m:s');
                    connection.query('UPDATE users set online = 1, last_login = ? where username = ?', [last_login, data.username.toLowerCase()], (err) => {
                        if (err)
                            callback(err, null);
                        else {
                            const user = {
                                id: rows[0].id_user,
                                username: rows[0].username,
                                firstname: rows[0].firstname,
                                lastname: rows[0].lastname
                            };
                            callback(null, user);
                        }
                    })
                }
            }
        });
    },

    logout: (userid, callback) => {
        connection.query('UPDATE users set online = 0 where id_user = ?', userid, (err) => {
            if (err)
                callback(err);
            else
                callback(null);
        });
    },

    modify_email: (data, callback) => {
        connection.query('UPDATE users SET email = ? Where id_user = ?', [data.new_email.toLowerCase(), data.userid], (err) => {
            if (err)
                callback(err);
            else
                callback(null);
        });
    },

    modify_firstname: (data, callback) => {
        connection.query('UPDATE users SET firstname = ? Where id_user = ?', [data.new_firstname.toLowerCase(), data.userid], (err) => {
            if (err)
                callback(err);
            else
                callback(null);
        });
    },

    modify_lastname: (data, callback) => {
        connection.query('UPDATE users SET lastname = ? Where id_user = ?', [data.new_lastname.toLowerCase(), data.userid], (err) => {
            if (err)
                callback(err);
            else
                callback(null);
        });
    },

    modify_profile: (data, callback) => {
        connection.query('SELECT id_user FROM profiles WHERE id_user = ?', data.id_user, (err, rows) => {
            if (err)
                callback(err);
            else if (!rows[0]) {
                connection.query('INSERT INTO profiles set ?', [data], (err) => {
                    if (err)
                        callback(err);
                    else
                        callback(null);
                });
            } else {
                connection.query('UPDATE profiles set ? WHERE id_user = ?', [data, data.id_user], (err) => {
                    if (err)
                        callback(err);
                    else
                        callback(null);
                });
            }
        });
    }
}