import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css'

const Map = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} className="leaflet-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    Test Popup
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
