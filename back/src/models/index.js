const connection = require('../config/database');

async function user_interest(userid){
    try{
        const result = await connection.query(`
            SELECT id_interest FROM users_interests WHERE id_user = ?
        `, [userid]);
        return (result);
    }catch (err) {
        throw new Error(err);
    }
}

function InterestArray(userinterest){
    let userIntArr = [];
    for (let entry of userinterest) {
        userIntArr.push(entry.id_interest);
    }
    return (userIntArr);
}

async function getInterestNb(suggId,userIntArr){
    try{
        const result = await connection.query(`
            SELECT (id) 
                FROM users_interests 
                WHERE id_user = ? 
                AND id_interest IN (?)
        `, [suggId, userIntArr])
        return (result);
    } catch (err) {
        throw new Error(err);
    }
};

async function getInterestNum(userinterest, result){
    let userIntArr = InterestArray(userinterest);
    let numCommonInterest = {};
    for (let j = 0; j < result.length; j++){
        let suggId = result[j].id_user;
        const lengthInterest = await getInterestNb(suggId, userIntArr); 
        numCommonInterest[j] = lengthInterest.length;
}
return (numCommonInterest);
}

export async function getSuggestions(gender, sexPrefer, minLat, maxLat, minLong, MaxLong, userid) {
    try {
        const result = await connection.query(`
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography,
                location_lat, location_lon, fame, city
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE gender = ?
                AND sex_prefer = ?
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,[gender, sexPrefer, 0, 300, minLong, MaxLong, userid, userid]);
        const userinterest = await user_interest(userid);
        const resultOfgetIntNum = await getInterestNum(userinterest, result);
        for (let k = 0; k < result.length; k++){
            result[k]['CommonInterestNb'] = resultOfgetIntNum[k];
        }
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getSuggestionsIfBi(minLat, maxLat, minLong, MaxLong, userid){
    try {
        const result = await connection.query(`
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography,
                location_lat, location_lon, fame
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE sex_prefer = ?
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,["bi", minLat, maxLat, minLong, MaxLong, userid, userid]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

export async function searchUser(userid, keyword){
    try {
        const result = await connection.query(`
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography, 
                location_lat, location_lon, fame
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE (
                    username LIKE '%${keyword}%'
                    OR firstname LIKE '%${keyword}%'
                    OR lastname LIKE '%${keyword}%'
                    OR biography LIKE '%${keyword}%'
                )
                AND users.id_user != ?
                ORDER BY fame DESC`,[userid]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

export async function filterUser(ageMin,ageMax,gender,sexPrefer,minLat,maxLat,minLong,MaxLong,userid){
    try {
        const result = await connection.query(`
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography, 
                location_lat, location_lon, fame
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE gender = ?
                AND sex_prefer = ?
                AND ((SELECT YEAR(birthday)) BETWEEN ? AND ?)
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,[gender, sexPrefer, ageMin,ageMax,minLat, maxLat, minLong, MaxLong, userid, userid]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}