import Geocode from "react-geocode";

const updateCity = (lat, lng) =>{
    // Geocode.setApiKey("");
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

export default updateCity;