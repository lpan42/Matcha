const connection = require('../config/database');

// function arr_suggestions(user, suggestions){
//     let userInterest = [];
//     let numCommonInterest = {};
//     user.forEach((entry) => {
//         userInterest.push(entry.id_interest);
//     });
//     suggestions.forEach = (sugg_entry) => {
//         const result = connection.query(`SELECT (id) FROM users_interests WHERE id_user = ? AND id_interest IN (?)`, [sugg_entry.id_user, userInterest]);
//         // result.then(function(result) {
//         //     numCommonInterest[sugg_entry.id_user] = result.length;
//         // })
//         console.log(result)
//     }
//     // return (numCommonInterest)
// };

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
        `,[gender, sexPrefer, 0, 300, minLong, MaxLong, userid, userid]);
        const userinterest = await user_interest(userid);
        const resultOfgetIntNum = await getInterestNum(userinterest, result);
        for (let k = 0; k < result.length; k++){
            result[k]['CommonInterestNb'] = resultOfgetIntNum[k];
        }
        console.log(result);
        
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
    
    // var numCommonInterest = getInterestNum(userIntArr);

        // await result.map(async(result) => {
        //     const suggNumCommonInterest = await connection.query(`SELECT (id) FROM users_interests WHERE id_user = ? AND id_interest IN (?)`, [result.id_user, userInterest]);
        //     suggNumCommonInterest.then(function(res, rej){
        //         numCommonInterest[result.id_user] = res.length;
        //     })
        // })
        // console.log(numCommonInterest)
        // const numCommonInterest = await arr_suggestions(userinterest, result);
        // result.forEach((object) => {
        //     numCommonInterest.forEach((entry) => {
        //         console.log(entry);
        //     })
        // });
        // const arr_ids = await arr_id_user(result);
        // let str = arr_ids.join(',', arr_ids);
        // const result2 = await connection.query(`
        //     SELECT * FROM users_interests WHERE id_user IN (?)
        // `, str);

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