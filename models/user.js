const connection = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = {
    verifyExistEmail: (email,result) => {
        connection.query('SELECT email FROM users WHERE email = ?', email, (err, rows) => {
            if(err) {
                result(err, null);
            }
            else{
                result(null, rows);
            }
        })
    },

    verifyExistUsername: (username,result) => {
        connection.query('SELECT username FROM users WHERE username = ?', username, (err, rows) => {
            if(err) {
                result(err, null);
            }
            else{
                result(null, rows);
            }
        })
    },

    createNewUser: (body, result) => {
        const hash = bcrypt.hashSync(body.password, 10);
        const active_link = crypto.randomBytes(10).toString('hex');
        const data = {
            email: body.email,
            username: body.username,
            firstname: body.firstname,
            lastname: body.lastname,
            password: hash,
            active_link: active_link
        };
        connection.query('INSERT INTO users SET ?', data, (err, rows) => {
            if(err) {
                result(err, null);
            }
            else{
                result(null, rows);
            }
        });
    },

    login: (data, result) => {
        connection.query('SELECT * FROM users WHERE username = ?', data.username, (err, rows) => {
            if(err) {
                result(err, null);
            }
            else if(!rows[0]){
                result(null, 'User does not exit, please create an account first');
            }
            else if(rows[0]){
                if(!rows[0].active){
                    result(null, 'Your accunt has not been actived, check your email');
                }
                else if(!bcrypt.compareSync(data.password, rows[0].password)){
                    result(null, 'password unmatched, try again');
                }
                else{
                    result(null, rows);
                }
            }
        });
    }
}
