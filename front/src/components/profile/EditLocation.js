import React, { Fragment, useContext, useState, Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs ,withGoogleMap, GoogleMap, Marker} from "react-google-maps";
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
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
            {props.isMarkerShown && <Marker position={{ lat: props.position.lat, lng: props.position.lng }} draggable={true} onDragEnd={(e) => props.onMarkerDragEnd(e.latLng.lat(), e.latLng.lng())} />}
            </GoogleMap>
        }
        </Fragment>
);

const EditLocation = ({position}) => {
    const [location, setLocation] = useState({
        isMarkerShown: false,
        zoom: 11,
        error: null,
        marker: null,
        position: {lat: position.data.location_lat, lng: position.data.location_lon},
    });

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
			},
			error => (error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )}else{
            this.setLocation({
                error: true
            })
        }
    };

    const onMarkerDragEnd = (latitude, longitude) => {
        setLocation({
            ...location,
            position: { lat: latitude, lng: longitude },
        })
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


