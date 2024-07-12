import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';
import LocationMarker from './LocationMarker';
import {reverseGeocode} from "@/js/reverseGeocode";

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve([latitude, longitude]);
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        }
    });
};

const ClickableMap = ({ onClick }) => {
    useMapEvents({
        click(event) {
            onClick(event.latlng);
        },
    });
    return null;
};

const FlyToMarker = ({ position, popupText }) => {
    const map = useMapEvents({
        click() {
            map.flyTo(position, map.getZoom());
        },
    });

    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [position, map]);

    return <LocationMarker position={position} popupText={popupText} />;
};

/**
 * Map Component
 * - Zeigt eine Karte mit Leaflet an
 * - Bestimmt den aktuellen Standort des Nutzers
 * - Zeigt den aktuellen Standort auf der Karte an
 * - Ermöglicht das Klicken auf die Karte, um Geo-Koordinaten einer ausgewählten Position anzuzeigen
 */
const Map = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [error, setError] = useState(null);

    // Bestimmt den aktuellen Standort des Nutzers
    useEffect(() => {
        getCurrentLocation()
            .then((position) => {
                setCurrentPosition(position);
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error getting current position:', error);
            });
    }, []);

    // Handhabt das Klicken auf die Karte und setzt die ausgewählte Position
    const handleMapClick = async (latlng) => {
        setSelectedPosition([latlng.lat, latlng.lng]);
        try {
            const data = await reverseGeocode(latlng.lat, latlng.lng);
            setLocationInfo(data.display_name);
        } catch (error) {
            setLocationInfo('Fehler beim Abrufen der Ortsinformationen');
        }
    };

    return (
        <div className="map-container">
            <MapContainer center={[51.505, -0.09]} zoom={16} className="leaflet-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {currentPosition && <FlyToMarker position={currentPosition} popupText="You are here" />}
                <ClickableMap onClick={handleMapClick} />
                {selectedPosition && (
                    <Marker position={selectedPosition}>
                        <Popup>
                            Ausgewählte Position: <br /> Latitude: {selectedPosition[0]} <br /> Longitude: {selectedPosition[1]} <br/> {locationInfo}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            {error && <div className="error-message">Error: {error}</div>}
        </div>
    );
};

export default Map;