const connection = require('../config/database');

export async function createChatroom(userid1, userid2){
    try {
        await connection.query('INSERT INTO chatrooms (id_user_1, id_user_2) VALUES (?, ?)', [userid1, userid2]);
    } catch (err) {
        throw new Error(err);
    }
}

export async function getChatroomId(userid1, userid2){
    try{
        const chatroom = await connection.query('SELECT id_chatroom FROM chatrooms WHERE (id_user_1 = ? AND id_user_2 = ?) OR (id_user_1 = ? AND id_user_2 = ?)', [userid1, userid2, userid2, userid1]);
        return (chatroom[0]);
    }catch (err) {
        throw new Error(err);
    }
}

export async function getUserByChatroomId(id_chatroom){
    try{
        const result = await connection.query('SELECT id_user_1, id_user_2 FROM chatrooms WHERE id_chatroom = ?', id_chatroom);
        return result;
    }catch (err) {
        throw new Error(err);
    }
}

export async function unlinkChat(id_chatroom){
    try{
        await connection.query(`
        DELETE FROM chatrooms WHERE id_chatroom = ?; 
        DELETE FROM messages WHERE id_chatroom = ?
        `, [id_chatroom, id_chatroom]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function getMessageByChatroomId(id_chatroom){
	try{
        const result = await connection.query(`
            SELECT id_message, id_sender, users.online, users.username, users.firstname, profiles.avatar, time, message, readed
            FROM messages 
            LEFT JOIN users on users.id_user = messages.id_sender 
            LEFT JOIN profiles on profiles.id_user = messages.id_sender 
            WHERE id_chatroom = ? ORDER BY time ASC`
            , id_chatroom);
		return (result);
	} 
	catch (err) {
		throw new Error(err);
	}
}

export async function getUnread(id_user){
    try{
        const result = await connection.query(`
            SELECT id_chatroom, id_message, id_sender, users.online, users.username, users.firstname, users.lastname, profiles.avatar, readed, time
            FROM messages 
            LEFT JOIN users on users.id_user = messages.id_sender 
            LEFT JOIN profiles on profiles.id_user = messages.id_sender 
            WHERE messages.id_user = ?
            ORDER BY time DESC`
            , id_user);
		return (result);
	} 
	catch (err) {
		throw new Error(err);
	}
}
export async function setMessageReaded(id_user, id_chatroom){
    try{
        await connection.query(`
            UPDATE messages SET readed = 1 WHERE id_user = ? AND id_chatroom = ?`
        , [id_user, id_chatroom]);
        // const result = getUnread(id_user);
        // return result;
    }catch (err) {
		throw new Error(err);
	}
}

export async function getAllConnectedByUserid(id_user){
    const result = [];
    let i = 0;
    try{
        const result1 = await connection.query(`
            SELECT chatrooms.id_user_2 AS id_user, chatrooms.id_chatroom, users.online, users.username, users.firstname, users.lastname, profiles.avatar
            FROM chatrooms
            LEFT JOIN users on chatrooms.id_user_2 = users.id_user
            LEFT JOIN profiles on chatrooms.id_user_2 = profiles.id_user
            WHERE chatrooms.id_user_1 = ?`, 
        [id_user]);
        if(result1[0]){
            for(let j=0;j<result1.length;j++){
                result[i] = result1[j];
                i++;
            }
        }
        try {
            const result2 = await connection.query(`
                SELECT chatrooms.id_user_1 AS id_user, chatrooms.id_chatroom, users.online, users.username, users.firstname, users.lastname, profiles.avatar
                FROM chatrooms
                LEFT JOIN users on chatrooms.id_user_1 = users.id_user
                LEFT JOIN profiles on chatrooms.id_user_1 = profiles.id_user
                WHERE chatrooms.id_user_2 = ?`, 
            [id_user]);
            if(result2[0]){
                for(let j=0;j<result2.length;j++){
                    result[i] = result2[j];
                    i++;
                }
            }  
        }catch (err) {
            throw new Error(err);
        }
		return(result);
    } 
    catch (err) {
		throw new Error(err);
	}
}

export async function addMessage(data){
    try{
        await connection.query('INSERT messages SET ? ', data);
	}
	catch (err) {
		throw new Error(err);
	}
}

// export async function addChatNotif(id_message){
//     try{
//         const result = await connection.query(`
//         SELECT messages.id_sender, messages.time, users.firstname, users.lastname, profiles.avatar
//         FROM messages
//         LEFT JOIN users on messages.id_sender = users.id_user
//         LEFT JOIN profiles on messages.id_sender = profiles.id_user
//         WHERE messages.id_message = ? AND messages.readed = 0
//         `, id_message);
//         return result;
// 	} 
// 	catch (err) {
// 		throw new Error(err);
// 	}
// }