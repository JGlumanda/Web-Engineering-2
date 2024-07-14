import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

/**
 * LocationMarker component renders a marker on the map with an optional popup.
 * @param {Array} position - Array containing latitude and longitude.
 * @param {string} popupText - Optional text to display in the popup.
 */
const LocationMarker = ({ position, popupText }) => {
    return (
        <Marker position={position}>
            {popupText && <Popup>{popupText}</Popup>}
        </Marker>
    );
};

LocationMarker.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    popupText: PropTypes.string,
};

export default LocationMarker;
