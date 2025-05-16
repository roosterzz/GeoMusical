import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { cityMusicData } from './cityMusicData';

function MapView() {
  return (
    <MapContainer 
    center={[36.7783, -119.4179]} 
    zoom={6} 
    style={{ height: '100vh', width: '100%' }}>
    maxBounds ={[[32.0, -125.0],[42.0, -114.0]]}
    maxBoundsViscosity={1.0}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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