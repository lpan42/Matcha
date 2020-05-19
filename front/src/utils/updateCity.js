import Geocode from "react-geocode";

const updateCity = (lat, lng) =>{
    Geocode.setApiKey("AIzaSyCzpKxEeCWg9XY84g0eFLS_-Mg-OHqxERw");
    Geocode.setLanguage("en");
    let cityname = '';
    Geocode.fromLatLng(lat, lng)
    .then(
        res => {
            cityname = res.results[0].address_components[2].long_name;
        },
        error => {
            console.error(error);
        })
        return (cityname);
}

// const updateCity = (lat, lng) =>{
//     Geocode.setApiKey("AIzaSyCzpKxEeCWg9XY84g0eFLS_-Mg-OHqxERw");
//     Geocode.setLanguage("en");
//     return (
//         Geocode.fromLatLng(lat, lng)
//         .then(
//             res => {
//                 res.data.city = res.results[0].address_components[2].long_name;
//             },
//             error => {
//                 console.error(error);
//             })
//     )
// }

export default updateCity;