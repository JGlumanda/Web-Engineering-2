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
import SearchBar from "@/components/SearchBar";

/**
 * ClickableMap component to handle map clicks.
 * @param {function} onClick - Function to handle map click events.
 */
const ClickableMap = ({onClick}) => {
    useMapEvents({
        click(event) {
            onClick(event.latlng);
        },
    });
    return null;
};

/**
 * FlyToMarker component to fly to a specific position on the map.
 * @param {Array} position - Array containing latitude and longitude.
 * @param {string} popupText - Optional text to display in the popup.
 */
const FlyToMarker = ({position, popupText}) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [position, map]);

    return <LocationMarker position={position} popupText={popupText}/>;
};

const Map = () => {
    const [locationInfo, setLocationInfo] = useState(null);
    const [error, setError] = useState(null);
    const [popupOpened, setPopupOpened] = useState(false);
    const [wikipediaInfo, setWikipediaInfo] = useState('');

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    const shouldRenderFlyToMarker = startLocation !== null;
    const shouldRenderSelectedMarker = endLocation !== null;

    useEffect(() => {
        getCurrentLocation()
            .then((position) => {
                setStartLocation(position);
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error getting current position:', error);
            });
    }, []);

    const handleMapClick = async (latlng) => {
        setEndLocation([latlng.lat, latlng.lng]);
        const location = [latlng.lat, latlng.lng]
        await handleWikiPopup(location);
    };

    const flyToCurrentPosition = () => {
        getCurrentLocation()
            .then((position) => {
                setStartLocation(position);
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error getting current position:', error);
            });
    };

    const handleSetEndLocation = async (location) => {
        setEndLocation(location);
        await handleWikiPopup(location);
    };

    const handleWikiPopup = async (location) => {
        try {
            const data = await reverseGeocode(location[0], location[1]);
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

    return (
        <div className="map-container">
            <div className="searchbars-container">
                <SearchBar placeholder="Start location" onSelectLocation={setStartLocation}/>
                <SearchBar
                    placeholder="End location"
                    onSelectLocation={handleSetEndLocation}/>
            </div>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={16}
                className="leaflet-container"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {shouldRenderFlyToMarker && <FlyToMarker position={startLocation} popupText="You are here"/>}
                <ClickableMap onClick={handleMapClick}/>
                {shouldRenderSelectedMarker && (
                    <>
                        <FlyToMarker position={endLocation}/>
                        <RoutingMachine start={startLocation} end={endLocation}/>
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
