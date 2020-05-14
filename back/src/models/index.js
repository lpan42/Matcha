const connection = require('../config/database');

export async function getSuggestions(gender, sexPrefer, minLat, maxLat, minLong, MaxLong, userid) {
    try {
        const result = await connection.query(`
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography, 
                location_lat, location_lon, fame
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE gender = ?
                AND sex_prefer = ?
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,[gender, sexPrefer, minLat, maxLat, minLong, MaxLong, userid, userid]);
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
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC`,[userid,userid]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

export async function filterUser(ageMin,ageMax,fameMin,fameMax,gender,sexPrefer,minLat,maxLat,minLong,MaxLong,userid){
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
                AND (fame BETWEEN ? AND ?)
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,[gender, sexPrefer, ageMin,ageMax,fameMin,fameMax,minLat, maxLat, minLong, MaxLong, userid, userid]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}