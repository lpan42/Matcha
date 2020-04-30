const userModel = require('../models/user');
const indexModel = require('../models/index');
const geolib = require('geolib');
const moment = require('moment');

export async function getSuggestions(req, res) {
    const profile = await userModel.getProfileInfoById(req.userid);
    const range = geolib.getBoundsOfDistance(
        { latitude: profile.location_lat, longitude: profile.location_lon },
        10000
    );
    let suggestions = [];
    switch (profile.sex_prefer){
        case 'straight':
            suggestions = await indexModel.getSuggestions(
                profile.gender == 'male' ? 'female':'male',
                'straight',
                range[0].latitude,
                range[1].latitude,
                range[0].longitude,
                range[1].longitude,
                req.userid
            );
            break;
        case 'gay':
            suggestions = await indexModel.getSuggestions(
                profile.gender == 'male' ? 'male':'female',
                'gay',
                range[0].latitude,
                range[1].latitude,
                range[0].longitude,
                range[1].longitude,
                req.userid
            );
            break;
        case 'bi':
            suggestions = await indexModel.getSuggestionsIfBi(
                range[0].latitude,
                range[1].latitude,
                range[0].longitude,
                range[1].longitude,
                req.userid
            );
            break;
    }
    return res.status(200).json({
        data: suggestions
    });
}
// getBoundsOfDistance return:
// [0]southwestern：min{latitude: -0.04491576420597608, longitude: -0.04491576420597608},
// [1]northeastern: max{latitude: 0.04491576420597608, longitude: 0.04491576420597608}

export async function searchUser(req, res){
    const result = await indexModel.searchUser(req.userid,req.params.searchUserInput);
    return res.status(200).json({
        data: result
    });
}

const ageToBirthYear = (age) => {
    const year = moment().format("YYYY");
    const birthYear = moment().set("year", year - age).format("YYYY");
    return birthYear;
}
const sortInterests = (users, tags) => {
    var sortedUsers = [];
    for (var i = 0; i < users.length; i++) {
      var count = 0;
      for (var k = 0; k < users[i].interests.length; k++) {
        for(var j = 0; j < tags.length; j++) {
            if(tags[j].interest == users[i].interests[k].interest){
                count++;
            }
        }
      }
      if (count == tags.length) 
      sortedUsers.push(users[i]);
    }
    return sortedUsers;
  }

export async function filterUser(req,res){
    const profile = await userModel.getProfileInfoById(req.userid);
    let range = geolib.getBoundsOfDistance(
        { latitude: profile.location_lat, longitude: profile.location_lon },
        req.body.distance*1000
    );
    let ageMin = ageToBirthYear(req.body.age[1]);
    let ageMax = ageToBirthYear(req.body.age[0]);
    let gender = req.body.gender;
    if (!gender){
        switch (profile.gender){
            case 'male':
                gender = 'female';
                break;
            case 'female':
                gender = 'male';
                break;
        }
    }
    let sexPrefer = req.body.sexPrefer;
    if(!sexPrefer){
        sexPrefer = profile.sex_prefer;
    }
    let tags = req.body.selectedInterests;
    let users = await indexModel.filterUser(ageMin,ageMax,gender,sexPrefer,
        range[0].latitude,range[1].latitude,range[0].longitude,range[1].longitude,req.userid);
    for (var i = 0; i < users.length; i++) {
        const interests = await userModel.getInterestsById(users[i].id_user);
        users[i].interests = interests;
    }
    let result;
    result = users;
    if(tags.length && users.length){
        result = sortInterests(users,tags);
    }
    return res.status(200).json({
        data: result
    });
}