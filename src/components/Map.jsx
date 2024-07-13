import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';
import LocationMarker from './LocationMarker';
import {Fab, Icon} from "framework7-react";
import RoutingMachine from './RoutingMachine';
import {getCurrentLocation, reverseGeocode} from "@/js/locationMethods";
import {fetchWikipediaInfo, mapAddressComponents} from "@/js/wikipediaAPI";
import WikipediaInfo from "@/components/WikipediaInfo";

const ClickableMap = ({onClick}) => {
    useMapEvents({
        click(event) {
            onClick(event.latlng);
        },
    });
    return null;
};

const FlyToMarker = ({position, popupText}) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [position, map]);

    return <LocationMarker position={position} popupText={popupText}/>;
};

const Map = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [error, setError] = useState(null);
    const [popupOpened, setPopupOpened] = useState(false);
    const [wikipediaInfo, setWikipediaInfo] = useState('');

    const shouldRenderFlyToMarker = currentPosition !== null;
    const shouldRenderSelectedMarker = selectedPosition !== null;

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

    const handleMapClick = async (latlng) => {
        setSelectedPosition([latlng.lat, latlng.lng]);
        try {
            const data = await reverseGeocode(latlng.lat, latlng.lng);
            const address = mapAddressComponents(data.address);
            const cityName = address.city || data.display_name;
            setLocationInfo(cityName);
            const wikiInfo = await fetchWikipediaInfo(cityName);
            setWikipediaInfo(wikiInfo);
            setPopupOpened(true);
        } catch (error) {
            setLocationInfo('Fehler beim Abrufen der Ortsinformationen');
            setWikipediaInfo('Error fetching Wikipedia info.');
        }
    };

    const handleMarkerClick = () => {
        setPopupOpened(true);
    };

    const flyToCurrentPosition = () => {
        getCurrentLocation()
            .then((position) => {
                setCurrentPosition(position);
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error getting current position:', error);
            });
    };

    return (
        <div className="map-container">
            <MapContainer center={[51.505, -0.09]} zoom={16} className="leaflet-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {shouldRenderFlyToMarker && <FlyToMarker position={currentPosition} popupText="You are here"/>}
                <ClickableMap onClick={handleMapClick}/>
                {shouldRenderSelectedMarker && (
                    <>
                        <FlyToMarker position={selectedPosition}/>
                        <RoutingMachine start={currentPosition} end={selectedPosition}/>
                    </>
                )}
            </MapContainer>
            {error && <div className="error-message">Error: {error}</div>}
            <Fab position="right-bottom" slot="fixed" onClick={flyToCurrentPosition}>
                <Icon material="gps_fixed"/>
            </Fab>
            <WikipediaInfo
                query={locationInfo}
                opened={popupOpened}
                onClose={() => setPopupOpened(false)}
                info={wikipediaInfo}
            />
        </div>
    );
};

export default Map;