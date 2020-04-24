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

export async function getSuggestionsIfBi(minLat, maxLat, minLong, MaxLong, userid) {
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
// sql:
//   "SELECT id, username, firstname, lastname, gender, online, pop_score, sexual_orientation, city, profile_picture_url, bio, birthdate, geo_lat, geo_long, last_connexion, pop_max, tags 
//   FROM users WHERE 
//   (gender = ?)AND (sexual_orientation = ?)  
//   AND ((SELECT YEAR(birthdate)) BETWEEN ? AND ?) 
//   AND (geo_lat BETWEEN ? AND ?) AND (geo_long BETWEEN ? AND ?) 
//   AND (pop_score BETWEEN ? AND ?) 
//   AND `id` NOT IN (SELECT user_id FROM block WHERE blocking_id = ?) 
//   AND `id` != ?;",