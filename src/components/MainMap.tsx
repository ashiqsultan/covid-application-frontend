import React, { useContext } from 'react';

import { Circle, MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext } from '../context/AppContext';

const mapContainerStyle = {
  width: '100%',
  height: '80vh',
};

const calculateRadius = (count: number) => {
  const minRadius = 25000;
  if (count < 1000) {
    return minRadius;
  } else {
    return Math.sqrt(count) * 3000;
  }
};

const MainMap: React.FC = () => {
  const state = useContext(AppContext).state;
  const worldData = state.worldData;

  return (
    <>
      <MapContainer
        maxZoom={10}
        style={mapContainerStyle}
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {worldData.map((country, index) => (
          <Circle
            key={index}
            center={[country.lat, country.lng]}
            pathOptions={{ color: 'red' }}
            radius={calculateRadius(country.count)}
          />
        ))}
      </MapContainer>
    </>
  );
};
export default MainMap;
