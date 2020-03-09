const connection = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment');

export async function getUserInfoById(userid) {
    try {
        const result = await connection.query('SELECT * FROM users WHERE id_user = ?', userid);
        if (result[0]) {
            const user = {
                id: result[0].id_user,
                username: result[0].username,
                email: result[0].email,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
            };
            return user;
        } else {
            return { err: "This user does not exist" };
        }
    } catch (err) {
        throw new Error(err);
    }
}

export async function verifyExistEmail(email, userid) {
    try {
        const result = await connection.query('SELECT email, id_user FROM users WHERE email = ?', email.toLowerCase());
        if(result[0] && result[0].id_user != userid)
            return { err: 'This email has been used' };
    } catch (err) {
        throw new Error(err);
    }
}

export async function verifyExistUsername(username) {
    try {
        const result = await connection.query('SELECT username FROM users WHERE username = ?', username.toLowerCase());
        if (result[0]) {
            return { err: 'This username has been taken' };
        }
    } catch (err) {
        throw new Error(err);
    }
}

export async function createNewUser(body) {
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
    try {
        const result = await connection.query('INSERT INTO users SET ?', data);
        return result.insertId;
    } catch (err) {
        throw new Error(err);
    }
}

export async function login(data) {
    try {
        const check = await connection.query('SELECT * FROM users WHERE username = ?', data.username.toLowerCase());
        if (!check[0])
            return { err: 'User does not exit, please create an account first' };
        else if (!check[0].active)
            return { err: 'Your accunt has not been actived, check your email' };
        else if (!bcrypt.compareSync(data.password, check[0].password))
            return { err: 'password unmatched, try again' };
        else {
            const last_login = moment().format('Y-M-D H:m:s');
            try {
                await connection.query('UPDATE users set online = 1, last_login = ? where username = ?', [last_login, data.username.toLowerCase()]);
                const user = {
                    userid: check[0].id_user,
                    username: check[0].username,
                };
                return user;
            } catch (err) {
                throw new Error(err);
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}

export async function logout(userid) {
    try {
        await connection.query('UPDATE users set online = 0 where id_user = ?', userid);
    } catch (err) {
        throw new Error(err);
    }
}

export async function getProfileInfoById(userid) {
    try {
        const result = await connection.query(
            `SELECT profiles.id_user, gender, birthday, sex_prefer, biography, location_lat, location_lon, picture, fame, username, firstname, lastname, last_login, online
            FROM profiles 
            INNER JOIN users on profiles.id_user = users.id_user
            WHERE profiles.id_user = ?`,
            userid);
        if(!result[0]){
            return { err: 'This user profile has not create his/her profile' };
        } else {
            return result[0];
        }
    } catch (err) {
        throw new Error(err);
    }
}

export async function getCreateProfile(userid){
    try {
        const result = await connection.query(`SELECT id_user, username, firstname, lastname, last_login, online FROM users WHERE id_user = ?`,userid);
        return result[0];
    } catch (err) {
        throw new Error(err);
    }
}

export async function getInterestsById(userid) {
    try {
        const result = await connection.query(`
            SELECT interest FROM interests 
            LEFT JOIN users_interests on interests.id_interest = users_interests.id_interest
            WHERE users_interests.id_user = ?`, 
        userid);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

export async function addFame(fame, userid) {
    try {
        await connection.query('SET @i = ?; UPDATE profiles SET fame = fame + @i WHERE id_user = ?', [fame, userid]);
    } catch (err) {
        throw new Error(err);
    }
}

export async function addNotif(data) {
    try {
        await connection.query('INSERT INTO notifications SET ?', data);
    } catch (err) {
        throw new Error(err);
    }
}

export async function getUnreadNotif(userid) {
    try {
        const result = await connection.query('SELECT id_notif, id_sender, notification, notif_time FROM notifications WHERE readed = 0 AND id_user = ? ORDER BY notif_time DESC', userid);
        return (result);
    } catch (err) {
        throw new Error(err);
    }
}
export async function getOneNotif(notifid){
    try {
        const result = await connection.query('SELECT id_sender, notification, notif_time FROM notifications WHERE id_notif = ?', notifid);
        if(!result[0]){
            return { err: 'Notification does not exist' };
        }
        try{
            await connection.query('UPDATE notifications SET readed = 1 WHERE id_notif = ?', notifid);

        }catch (err) {
            throw new Error(err);
        }   
        return (result[0]);
    } catch (err) {
        throw new Error(err);
    }
}
export async function modifyAccount(data, userid) {
    const result = await verifyExistEmail(data.email, userid);
    if(typeof(result) !== 'undefined'){
        return { err: 'This email has been used by another user' };
    }
    try {
        await connection.query('UPDATE users SET ? WHERE id_user = ?', [data, userid]);
    } catch (err) {
        throw new Error(err);
    }
}

export async function modify_profile(data) {
    try {
        const profile = await connection.query('SELECT id_user FROM profiles WHERE id_user = ?', [data.id_user]);
        if (!profile[0]) {
            try {
                await connection.query('INSERT INTO profiles set ?', [data]);
            } catch (err) {
                throw new Error(err);
            }
        } else {
            try {
                await connection.query('UPDATE profiles set ? WHERE id_user = ?', [data, data.id_user]);
            } catch (err) {
                throw new Error(err);
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}

export async function modifyInterests(data) {
    try{
        await connection.query('DELETE FROM users_interests WHERE id_user = ?', data.id_user);
    }catch(err){
        throw new Error(err);
    }
    data.interest.map( async (interest) => {
        try{
            const id_interest = await connection.query('SELECT id_interest FROM interests WHERE interest = ?', interest.interest);
            try{
                await connection.query(' INSERT INTO users_interests (id_user, id_interest) VALUES (?,?)',
                     [data.id_user, id_interest[0].id_interest])
            }catch (err) {
                throw new Error(err);
            }
        }catch (err) {
            throw new Error(err);
        }
    })
}

export async function getHistory(userid){
    try{
        const result = await connection.query("SELECT id_notif, id_sender, notification, notif_time FROM notifications WHERE id_user = ? ORDER BY notif_time DESC", userid);
        return (result);
    } catch (err) {
        throw new Error(err);
    }
}

export async function checkLike(userid, likerid){
    try{
        const result = await connection.query("SELECT * FROM likes WHERE id_user = ? AND id_sender = ?", [userid, likerid]);
        return result;
    }catch (err) {
        throw new Error(err);
    }
}

export async function addLike(userid, likerid){
    try {
        await connection.query('INSERT INTO likes (id_user, id_sender) VALUES (?, ?)', [userid, likerid]);
    } catch (err) {
        throw new Error(err);
    }
}

export async function unlike(userid, unlikerid){
    try{
        await connection.query('DELETE FROM likes WHERE id_user = ? AND id_sender = ?;', [userid, unlikerid]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function getInterestsList(){
    try{
        const result = await connection.query('SELECT interest FROM interests;');
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
}