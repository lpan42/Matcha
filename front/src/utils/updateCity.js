import Geocode from "react-geocode";

const updateCity = async (lat, lng) =>{
    Geocode.setApiKey("");
    const result = Geocode.fromLatLng(lat.toString(), lng.toString());
    return (result);
}

export default updateCity;