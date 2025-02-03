import { useEffect, useRef } from 'react';
import L from 'leaflet';

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = L.map('map', {
        center: [-6.200000, 106.816666], // Coordinates for Jakarta, Indonesia
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      // Properly remove the map instance when the component unmounts
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const mapStyle = {
    height: '500px',
    width: '800%',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  };

  return <div id="map" style={mapStyle} />;
};

export default Map;