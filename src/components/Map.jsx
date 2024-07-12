import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';
import LocationMarker from './LocationMarker';

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    resolve([latitude, longitude]);
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
};

const Map = () => {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        getCurrentLocation()
            .then((position) => {
                setCurrentPosition(position);
            })
            .catch((error) => {
                console.error('Error getting current position:', error);
            });
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={16} className="leaflet-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentPosition && <FlyToMarker position={currentPosition} popupText="You are here"/>}
        </MapContainer>
    );
};

const FlyToMarker = ({position, popupText}) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [position, map]);

    return <LocationMarker position={position} popupText={popupText}/>;
};

export default Map;