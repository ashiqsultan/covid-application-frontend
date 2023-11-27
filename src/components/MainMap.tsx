import React, { useContext, useEffect } from 'react';
// import L, { LatLng } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext } from '../context/AppContext';

const mapContainerStyle = {
  width: '100%',
  height: '80vh',
};

const MainMap: React.FC = () => {
  const state = useContext(AppContext).state;
  useEffect(() => {
    console.log(state);
  }, [state.worldData]);
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
      </MapContainer>
    </>
  );
};
export default MainMap;
