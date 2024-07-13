import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import '../css/routingMachine.css'

const RoutingMachine = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!start || !end) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
            draggableWaypoints: false,
            routeWhileDragging: false,
            autoRoute: true,
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [start, end, map]);

    return null;
};

export default RoutingMachine;
