import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

export default function RoutingControl({ startPos, endPos, onDistanceCalculated }) {
  const map = useMap();

  useEffect(() => {
    if (!startPos || !endPos) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPos[0], startPos[1]),
        L.latLng(endPos[0], endPos[1])
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: "#F05442", weight: 6 }]
      },
      createMarker: () => null, // We handle markers ourselves
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: true // Shows the instruction panel
    }).addTo(map);

    routingControl.on('routesfound', function(e) {
      const routes = e.routes;
      if (routes && routes.length > 0) {
        const summary = routes[0].summary;
        // distance is in meters
        const distanceKm = (summary.totalDistance / 1000).toFixed(2);
        if (onDistanceCalculated) {
          onDistanceCalculated(distanceKm);
        }
      }
    });

    return () => {
      if (map && map.removeControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, startPos, endPos, onDistanceCalculated]);

  return null;
}
