const connection = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = {
    verifyExistEmail: (email,callabck) => {
        connection.query('SELECT email FROM users WHERE email = ?', email.toLowerCase(), (err, rows) => {
            if(err) throw new Error(err);
            else{
                callabck(null, rows);
            }
        })
    },

    verifyExistUsername: (username,callabck) => {
        connection.query('SELECT username FROM users WHERE username = ?', username.toLowerCase(), (err, rows) => {
            if(err) throw new Error(err);
            else{
                callabck(null, rows);
            }
        })
    },

    createNewUser: (body, callabck) => {
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
            if(err) throw new Error(err);
            else{
                callabck(null);
            }
        });
    },

    login: (data, callback) => {
        connection.query('SELECT * FROM users WHERE username = ?', data.username.toLowerCase(), function (err, rows) {
            if(err) throw new Error(err);
            else if(!rows[0]){
                callback(null, 'User does not exit, please create an account first');
            }
            else if(rows[0]){
                if(!rows[0].active){
                    callback(null, 'Your accunt has not been actived, check your email');
                }
                else if(!bcrypt.compareSync(data.password, rows[0].password)){
                    callback(null, 'password unmatched, try again');
                }
                else{
                    connection.query('UPDATE users set online = 1 where username = ?', data.username.toLowerCase(), (err) => {
                        if(err) throw new Error(err);
                    })
                    callback(null, rows);
                }
            }
        });
    },
    
    logout: (userid, callback) => {
        connection.query('UPDATE users set online = 0 where id_user = ?', userid, (err) => { 
            if(err) throw new Error(err);
            else{
                callback(null);
            }
        });
    },

    changeEmail: (data, callabck) => {
        connection.query('SELECT email FROM users WHERE id_user = ?', [data.userid], (err, rows) => {
            if(err) throw new Error(err);
            else{
                if(rows[0].email != data.old_email.toLowerCase()) {
                    callabck(null, 'Old email did not match, please comfirm');
                }
                else{
                    connection.query('UPDATE users SET email = ? Where id_user = ?', [data.new_email.toLowerCase(), data.userid], (err) => {
                        if(err) throw new Error(err);
                    });
                    callabck(null);
                }
            }
        });
    },

    changeFirstname: (data, callabck) => {
        connection.query('SELECT firstname FROM users WHERE id_user = ?', [data.userid], (err, rows) => {
            if(err) throw new Error(err);
            else{
                if(rows[0].firstname != data.old_firstname.toLowerCase()) {
                    callabck(null, 'Old firstname did not match, please comfirm');
                }
                else{
                    connection.query('UPDATE users SET firstname = ? Where id_user = ?', [data.new_firstname.toLowerCase(), data.userid], (err) => {
                        if(err) throw new Error(err);
                    });
                    callabck(null);
                }
            }
        });
    },

    changeLastname: (data, result) => {
        connection.query('SELECT lastname FROM users WHERE id_user = ?', [data.userid], (err, rows) => {
            if(err) throw new Error(err);
            else{
                if(rows[0].lastname != data.old_lastname.toLowerCase()) {
                    result(null, 'Old lastname did not match, please comfirm');
                }
                else{
                    connection.query('UPDATE users SET lastname = ? Where id_user = ?', [data.new_lastname.toLowerCase(), data.userid], (err) => {
                        if(err) throw new Error(err);
                    });
                    callback(null);
                }
            }
        });
    }
}
