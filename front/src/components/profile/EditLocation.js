import React, { Fragment, useContext, useState, useEffect, Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs ,withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import ProfileContext from '../../contexts/profile/profileContext';
import UserContext from '../../contexts/user/userContext';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import updateCity from '../../utils/updateCity';


const MyMapComponent = withScriptjs(withGoogleMap
    (props =>
        <Fragment>
        {
                <GoogleMap
                    zoom={props.zoom}
                    center={{ lat: props.position.lat, lng: props.position.lng }}
                >
                {props.isMarkerShown && <Marker position={{ lat: props.position.lat, lng: props.position.lng }} draggable={true} onDragEnd={(e) => {props.onMarkerDragEnd(e.latLng.lat(), e.latLng.lng())}} />}
                </GoogleMap>
        }
        </Fragment>
));

const EditLocation = ({token, location_lat, location_lon}) => {

    const  profileContext = useContext(ProfileContext);
    const { profile } = profileContext;
    const userContext = useContext(UserContext);
    const { user } = userContext;

    const [location, setLocation] = useState({
        isMarkerShown: profile ? true : false,
        zoom: profile ? 15 : 11,
        error: null,
        position: {
            lat: profile ? profile.data.location_lat : 48.8534,
            lng: profile ? profile.data.location_lon : 2.3488
        },
        city: null,
    });

    useEffect(() => {
        updateCity(location.position.lat, location.position.lng)
        .then(data => {
                setLocation({
                ...location,
                city: data.city
            })}
        );
    }, [location.position])

    const allowLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
			position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLocation({ ...location,
                    position: { lat: latitude, lng: longitude },
                    isMarkerShown: true,
                    zoom: 15
                });
                profile.data.location_lat = latitude;
                profile.data.location_lon = longitude;
                modify_location(profile);
			},
			error => (error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )}else{
            setLocation({
                error: true
            })
        }
    };

    const modify_location = async (data) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const result = await axios.post('/user/modify/location', data, config);
        }catch(err){
            console.log(err);
        }
    }
        
    const onMarkerDragEnd = (latitude, longitude) => {
        setLocation({
            ...location,
            position: { lat: latitude, lng: longitude },
        });
        profile.data.location_lat = latitude;
        profile.data.location_lon = longitude;
        modify_location(profile);
    };

    // const updateCity = () => {
    //     Geocode.setApiKey("AIzaSyCzpKxEeCWg9XY84g0eFLS_-Mg-OHqxERw");
    //     Geocode.setLanguage("en");
    //     Geocode.fromLatLng(location.position.lat, location.position.lng)
    //     .then(
    //         response => {
    //             const locatecity = response.results[0].address_components[2].long_name;
    //             setLocation({
    //                 ...location,
    //                 city: locatecity
    //             })
    //         },
    //         error => {
    //             console.error(error);
    //         }
    //     );
    // };

    return (
        <Fragment>
            <LocationOnOutlinedIcon onClick={() => allowLocation()}/>
            City {location.city}
            <MyMapComponent
                isMarkerShown={location.isMarkerShown}
                zoom={location.zoom}
                position={location.position}
                onMarkerDragEnd={onMarkerDragEnd}
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCzpKxEeCWg9XY84g0eFLS_-Mg-OHqxERw&libraries=places"}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement= {<div style={{ height: `100%` }} />}
            />
        </Fragment>
        )
}

export default EditLocation

//in index.html include the api key for googlemap


