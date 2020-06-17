const faker = require('faker');
const randomInt = require('random-int');
const randomFloat = require('random-float');
const randomItem = require('random-item');
const connection = require('./database');
const bcrypt = require('bcrypt');
const request = require('request');

export async function generateUser(){
    for (let j=0;j<1000;j++){
        let user = {   
            email: faker.internet.email(),
            username:faker.internet.userName(),
            password:bcrypt.hashSync("1234", 10),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            last_login:faker.date.recent(),
            creation_date:faker.date.past(),
            active: 1,
            online: randomItem([0,1]),
        }
        let result = null;
        try {
            result = await connection.query('INSERT IGNORE INTO users SET ?', user);
            try{
                await connection.query('INSERT IGNORE INTO profiles (id_user) value (?)', result.insertId);
            }catch (err) {
                throw new Error(err);
            }
        } catch (err) {
            throw new Error(err);
        }
        let profile = {
            gender:randomItem(["male","female"]),
            birthday:faker.date.between('1970-01-01', '2002-12-31'),
            sex_prefer:randomItem(["straight", "gay", "bi"]),
            biography: `Hi, i am ${user.firstname} ${user.lastname}`,
            location_lat: randomFloat(46, 51),
            location_lon: randomFloat(-0.9, 8),
            fame:randomInt(0,500),
        }
        try {
            await connection.query('UPDATE profiles set ? WHERE id_user = ?', [profile, result.insertId]);
        } catch (err) {
            throw new Error(err);
        }
        let gender = null;
        profile.gender === "male" ? gender="man" : gender="woman";
        request(`https://source.unsplash.com/random/640x480?${gender}`, async (err,res) => {
            let avatar = res.request.uri.href;
            try {
                await connection.query('UPDATE profiles set avatar=? WHERE id_user = ?', [avatar,result.insertId]);
            } catch (err) {
                throw new Error(err);
            }
        })
        let interests = [];
        let random;
        for (let i=0;i<4;i++) {
            random = randomInt(1, 14);
            if (!interests.includes(random)) {
                interests.push(random);
                try {
                    await connection.query('INSERT IGNORE INTO users_interests (id_user, id_interest) VALUES (?,?)', [result.insertId,random]);
                } catch (err) {
                    throw new Error(err);
                }
            }
        };
    }
}
