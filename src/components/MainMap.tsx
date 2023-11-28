import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Circle, MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext } from '../context/AppContext';
import { Typography, Box } from '@mui/material';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Recenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 4);
  }, [center]);
  return null;
};

const MainMap: React.FC = () => {
  const { state, setSelectedCountry } = useContext(AppContext);
  const worldData = state.worldData;
  const selectedCountry = state.selectedCountry;
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    20.5937, 78.9629,
  ]);
  // State to manage the popup
  const [popup, setPopup] = useState<{
    position: [number, number];
    isOpen: boolean;
  }>({
    position: [0, 0],
    isOpen: false,
  });
  const [selectedCountryName, setSelectedCountryName] = useState<string>('');

  const calculateRadius = useCallback(
    (count: number) => {
      const minRadius = 25000;
      if (count < 1000) return minRadius;
      if (state.category === 'death') {
        return Math.sqrt(count) * 3000;
      } else {
        return Math.sqrt(count) * 1000;
      }
    },
    [state.category]
  );

  // Function to handle click and open the popup
  const handleCircleClick = (event: any, country: any) => {
    setSelectedCountryName(country.name);
    setSelectedCountry(country.name);
    setPopup({
      position: [country.lat, country.lng],
      isOpen: true,
    });
  };

  useEffect(() => {
    if (selectedCountry) {
      const countryData = worldData.find(
        (country) => country.name === selectedCountry
      );
      if (countryData) {
        setMapCenter([countryData.lat, countryData.lng]);
      }
    }
  }, [selectedCountry]);

  return (
    <>
      <MapContainer
        maxZoom={10}
        style={mapContainerStyle}
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom={true}
      >
        <Recenter center={mapCenter} />
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
            eventHandlers={{
              click: (event) => handleCircleClick(event, country),
            }}
          ></Circle>
        ))}
        {popup.isOpen && (
          <Popup position={popup.position}>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant='h6'>{selectedCountryName}</Typography>
            </Box>
          </Popup>
        )}
      </MapContainer>
    </>
  );
};
export default MainMap;
