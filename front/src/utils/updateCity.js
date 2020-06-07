import Geocode from "react-geocode";
import { APIKEY } from "../components/APIkey";

const updateCity = async (lat, lng) =>{
    Geocode.setApiKey(APIKEY);
    const result = await Geocode.fromLatLng(lat.toString(), lng.toString());
    return (result);
}

export default updateCity;