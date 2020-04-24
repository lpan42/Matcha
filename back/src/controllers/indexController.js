const userModel = require('../models/user');
const indexModel = require('../models/index');
const jwtModel = require('../models/jwt');
const geolib = require('geolib');

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
            suggestions = indexModel.getSuggestionsIfBi(
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

// [0]southwestern：min{latitude: -0.04491576420597608, longitude: -0.04491576420597608},
// [1]northeastern: max{latitude: 0.04491576420597608, longitude: 0.04491576420597608}