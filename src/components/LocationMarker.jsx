import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

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