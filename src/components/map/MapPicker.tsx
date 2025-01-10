// components/MapPicker.js

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

export default function MapPicker({ formData, setFormData }) {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (formData.fullAddress) {
      setAddress(formData.fullAddress);
    }
  }, [formData.fullAddress]);

  const handleMapClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
    fetchAddressFromCoordinates(e.latlng.lat, e.latlng.lng);
  };

  const fetchAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      if (data.address) {
        const fullAddress = `${data.address.road}, ${data.address.city}, ${data.address.country}`;
        setAddress(fullAddress);
        setFormData((prevData) => ({
          ...prevData,
          city: data.address.city,
          fullAddress: fullAddress,
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Update the map position without re-initializing it
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(new LatLng(position[0], position[1]), 13);
    }, [position, map]);

    return null;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Full Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1"
          placeholder="Select address"
          disabled
        />
      </div>

      <div className="h-64 mb-4">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
