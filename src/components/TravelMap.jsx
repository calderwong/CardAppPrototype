import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library itself

// --- Fix Leaflet's default icon path issue with webpack/vite ---
// Option 1: Direct import (works well with Vite/Create React App)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
});

// --- Component to adjust map bounds ---
function MapBoundsAdjuster({ locations }) {
    const map = useMap();
    React.useEffect(() => {
        if (locations && locations.length > 0) {
            const bounds = L.latLngBounds(locations.map(loc => [
                loc.coordinates[1], // Latitude
                loc.coordinates[0]  // Longitude
            ]));
            if (bounds.isValid()) {
                 map.fitBounds(bounds, { padding: [50, 50] }); // Add padding
            } else if (locations.length === 1) {
                // If only one point, center and zoom
                 map.setView([locations[0].coordinates[1], locations[0].coordinates[0]], 10); // Zoom level 10
            }
        }
    }, [locations, map]); // Re-run effect if locations or map instance change
    return null; // This component doesn't render anything itself
}

// --- Main Map Component ---
function TravelMap({ travelNotifications }) {
    // Combine all locations from all notifications into one array
    const allLocations = travelNotifications.reduce((acc, notification) => {
        return acc.concat(notification.locations || []); // Handle case where locations might be missing
    }, []);

    if (!allLocations || allLocations.length === 0) {
        return <p className="text-sm text-neutral-dark">No locations to display on map.</p>;
    }

    // Default center if no locations (shouldn't happen with the check above, but good practice)
    const defaultPosition = [40.7128, -74.0060]; // Default to NYC

    return (
        <MapContainer center={defaultPosition} zoom={2} style={{ height: '300px', width: '100%', borderRadius: '8px' }} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Using CartoDB Voyager tiles
            />
            {allLocations.map((location, index) => (
                location.coordinates && (
                    <Marker 
                        key={`${location.value}-${index}`} 
                        position={[
                            location.coordinates[1], // Leaflet uses [lat, lng]
                            location.coordinates[0]
                        ]}
                    >
                        <Popup>
                            {location.label}
                        </Popup>
                    </Marker>
                )
            ))}
            {/* Component to automatically adjust map bounds */} 
            <MapBoundsAdjuster locations={allLocations} /> 
        </MapContainer>
    );
}

export default TravelMap;
