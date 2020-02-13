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
         await connection.query('DELETE FROM chatrooms WHERE id_chatroom = ?; DELETE FROM messages WHERE id_chatroom = ?', [id_chatroom, id_chatroom]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function getMessageByChatroomId(id_chatroom){
	try{
		const result = await connection.query('SELECT * FROM messages WHERE id_chatroom = ? ORDER BY time DESC', id_chatroom);
		return (result);
	} 
	catch (err) {
		throw new Error(err);
	}
}

export async function getAllConnectedByUserid(id_user){
    try{
		const result = await connection.query('SELECT * FROM chatrooms WHERE id_user_1 = ? OR id_user_2 = ?', [id_user, id_user]);
		return (result);
	} 
	catch (err) {
		throw new Error(err);
	}
}

export async function addMessage(data){
    try{
        const result = await connection.query('INSERT messages SET ? ', data);
        return result.insertId;
	} 
	catch (err) {
		throw new Error(err);
	}
}