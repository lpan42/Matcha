import React, { Fragment, useContext, useState, Component } from 'react';
import { compose, withProps } from "recompose";
import {  withScriptjs ,withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import ProfileContext from '../../contexts/profile/profileContext';
import UserContext from '../../contexts/user/userContext';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?v=3.exp",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `300px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withGoogleMap,
    )(props =>
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
);

const EditLocation = ({position}) => {
    const  profileContext = useContext(ProfileContext);
    const {profile} = profileContext;

    const [location, setLocation] = useState({
        isMarkerShown: false,
        zoom: 11,
        error: null,
        marker: null,
        position: {lat: profile.data.location_lat, lng: profile.data.location_lon},
    });

    const updateLocation = async (profile) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try{
            const result =  await axios.post('/user/modify/location', profile, config);
        }catch(err){
            console.log(err);
        }
    }

    const allowLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
			position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLocation({ ...location,
                    position: { lat: latitude, lng: longitude },
                    zoom: 14,
                    isMarkerShown: true,
                });
                profile.data.location_lat = latitude;
                profile.data.location_lon = longitude;
                modify_location(profile);
			},
			error => (error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )}else{
            this.setLocation({
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
        console.log(profile);
        modify_location(profile);
    };

    return (
        <Fragment>
            <LocationOnOutlinedIcon onClick={() => allowLocation()}/>Locate Me
            <MyMapComponent
                isMarkerShown={location.isMarkerShown}
                zoom={location.zoom}
                position={location.position}
                onMarkerDragEnd={onMarkerDragEnd}
            />
        </Fragment>
        )
}

export default EditLocation

//in index.html include the api key for googlemap


