import Geocode from "react-geocode";

const updateCity = (lat, lng) =>{
    Geocode.setApiKey("AIzaSyCzpKxEeCWg9XY84g0eFLS_-Mg-OHqxERw");
    Geocode.setLanguage("en");
    return (
        Geocode.fromLatLng(lat, lng)
        .then(
            res => {
                res.data.city = response.results[0].address_components[2].long_name;
            },
            error => {
                console.error(error);
            })
    )
}

export default updateCity;