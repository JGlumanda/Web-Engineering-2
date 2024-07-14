import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import '../css/routingMachine.css';

/**
 * RoutingMachine component adds routing control to the map.
 * @param {Array} start - Starting coordinates [latitude, longitude].
 * @param {Array} end - Ending coordinates [latitude, longitude].
 */
const RoutingMachine = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!start || !end) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
            draggableWaypoints: false,
            routeWhileDragging: false,
            addWaypoints: false,
            collapsible: true,
            lineOptions: {
                styles: [{ color: '#ec6f6f', weight: 4 }]
            },
            autoRoute: true,
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [start, end, map]);

    return null;
};

export default RoutingMachine;
