import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { cityMusicData } from './cityMusicData';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { GeoJSON } from 'react-leaflet';
import { californiaGeoJson } from './californiaBorder';
import L from 'leaflet';

const musicIcon = new L.Icon({
    iconUrl: '/public/music-note.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

function MapView() {
    const mapRef = useRef();

useEffect(() => {
    if (mapRef.current) {
        mapRef.current.invalidateSize();
    }
}, []);

return (
    <MapContainer 
    center={[36.7783, -119.4179]} //centered on california
    zoom={6} 
    minZoom={5}
    maxZoom={10}
    scrollWheelZoom={true}
    style={{ height: '100%', width: '100%' }}
    maxBounds ={[[32.0, -125.0],[42.0, -114.0]]}  // California Borders
    maxBoundsViscosity={1.0}
    worldCopyJump={false} // prevents repeated maps
    ref={mapRef}
    >
   
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={californiaGeoJson} style={{
        color: 'blue',
        weight: 2,
        fillOpacity: 0
        }} />
        {Object.entries(cityMusicData).map(([city, data]) => (
        <Marker key={city} position={[data.lat, data.lng]}>
            <Popup>
            <h3>{city}</h3>
            <strong>Top Artists:</strong>
            <ul>
                {data.topArtists.map((artist, i) => <li key={i}>{artist}</li>)}
            </ul>
            <strong>Top Songs:</strong>
            <ul>
                {data.topSongs.map((song, i) => <li key={i}>{song}</li>)}
            </ul>
            </Popup>
        </Marker>
        ))}
    </MapContainer>
    );
}

export default MapView;