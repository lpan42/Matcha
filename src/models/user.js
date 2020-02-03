const connection = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment');

export async function modify_firstname(data)
{
	try{
		await connection.query('UPDATE users SET firstname = ? Where id_user = ?', [data.new_firstname.toLowerCase(), data.userid]);
	}
	catch(err){
		throw new Error(err);
	}
}

export async function getUserInfoById (userid)
{
	try{
		const result = await connection.query('SELECT * FROM users WHERE id_user = ?', userid);
		if (result[0]) 
		{
			const user = {
				id: result[0].id_user,
				username: result[0].username,
				email: result[0].email,
				firstname: result[0].firstname,
				lastname: result[0].lastname,
			};
			return user;
		}
		else {
			return { err: "This user does not exist" };
		}
	}
	catch(err){
		throw new Error(err);
	}
}

export async function verifyExistEmail (email)
{
	try{
		const result = await connection.query('SELECT email FROM users WHERE email = ?', email.toLowerCase());
		if(result[0]){
			return { err: 'This email has been used' };
		}
	}
	catch(err){
		throw new Error(err);
	}
}

export async function verifyExistUsername (username)
{
	try{
		const result = await connection.query('SELECT username FROM users WHERE username = ?', username.toLowerCase());
		if(result[0]){
			return { err: 'This username has been taken' };
		}
	}
	catch(err){
		throw new Error(err);
	}
}

export async function createNewUser (body)
{
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
	try{
		await connection.query('INSERT INTO users SET ?', data);
	}
	catch(err){
		throw new Error(err);
	}
}

export async function login (data)
{
	try{
		const check = await connection.query('SELECT * FROM users WHERE username = ?', data.username.toLowerCase());
		if(!check[0])
			return { err: 'User does not exit, please create an account first' };
		else if (!check[0].active)
			return { err: 'Your accunt has not been actived, check your email' };
		else if (!bcrypt.compareSync(data.password, check[0].password))
			return { err: 'password unmatched, try again' };
		else{
			const last_login = moment().format('Y-M-D H:m:s');
			try{
				await connection.query('UPDATE users set online = 1, last_login = ? where username = ?', [last_login, data.username.toLowerCase()]);
				const user = {
					id: check[0].id_user,
					username: check[0].username,
					firstname: check[0].firstname,
					lastname: check[0].lastname
				};
				return user;
			}
			catch(err){
				throw new Error(err);
			}
		}
	}
	catch(err){
		throw new Error(err);
	}
}

export async function logout (userid)
{
	try{
		await connection.query('UPDATE users set online = 0 where id_user = ?', userid);
	}
	catch(err){
		throw new Error(err);
	}
}

export async function getProfileInfoById (userid)
{
	try{
		const result = await connection.query(
		`SELECT profiles.id_user, gender, birthday, sex_prefer, biography, location_lat, location_lon, picture, fame, username, firstname, lastname, last_login
		FROM profiles 
		INNER JOIN users on profiles.id_user = users.id_user
		WHERE profiles.id_user = ?`,
		userid);
		if(!result[0]){
			return { err: 'This user profile does not exist' };
		}
		else{
			return result[0];
		}
	}
	catch(err){
		throw new Error(err);
	}
}

export async function getInterestsById (userid)
{
	try{
		const result = await connection.query('SELECT id_interest FROM users_interests WHERE id_user = ?', userid);
		return result[0];
	}
	catch(err){
		throw new Error(err);
	}
}

export async function visitPlusOne (data)
{
	try{
		const result = await connection.query('INSERT INTO visits SET ?;', data);
		console.log(result.insertId);
	}
	catch(err){
		throw new Error(err);
	}
		// if (err) callback(err, null);
		// else callback(null, rows.insertId);
}

// addNotif: (data, callback) => {
// 	connection.query('INSERT INTO notifications SET ?', data, (err) => {
// 		if (err) callback(err);
// 		else callback(null);
// 	})
// },


export async function modify_email (data)
{
	try{
		const result = await connection.query('SELECT email FROM users WHERE email = ?', data.new_email.toLowerCase());
		if(result[0]){
			return { err: 'This email has been used' };
		}
		else{
			try{
				await connection.query('UPDATE users SET email = ? Where id_user = ?', [data.new_email.toLowerCase(), data.userid]);   
			}
			catch(err){
				throw new Error(err);
			}
		}
	}
	catch(err){
		throw new Error(err);
	}
}

export async function modify_lastname (data)
{
	try{
		await connection.query('UPDATE users SET lastname = ? Where id_user = ?', [data.new_lastname.toLowerCase(), data.userid]);
	}
	catch(err){
		throw new Error(err);
	}
}

// export async function modify_profile (data)
// {
// 	connection.query('SELECT id_user FROM profiles WHERE id_user = ?', data.id_user, (err, rows) => {
// 		if (err)
// 			callback(err);
// 		else if (!rows[0]) {
// 			connection.query('INSERT INTO profiles set ?', [data], (err) => {
// 				if (err)
// 					callback(err);
// 				else
// 					callback(null);
// 			});
// 		} else {
// 			connection.query('UPDATE profiles set ? WHERE id_user = ?', [data, data.id_user], (err) => {
// 				if (err)
// 					callback(err);
// 				else
// 					callback(null);
// 			});
// 		}
// 	});
// }