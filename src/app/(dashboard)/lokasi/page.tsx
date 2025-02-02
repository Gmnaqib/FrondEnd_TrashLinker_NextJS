"use client";
import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import '@/styles/globals.css';

// Set Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiZGV3YXRyaSIsImEiOiJjbHR2Y2VndTgwaHZuMmtwOG0xcWk0eTlwIn0.tp1jXAL6FLd7DKwgOW--7g"; // Ganti dengan token yang valid

const dummyTPA = [
  {
    id: 1,
    name: "TPA Bantar Gebang",
    location: "Bekasi, Indonesia",
    image: "https://source.unsplash.com/400x300/?garbage",
    description: "TPA terbesar di Jabodetabek dengan kapasitas besar.",
    lat: -6.3254,
    lon: 107.0122,
  },
  {
    id: 2,
    name: "TPA Sumur Batu",
    location: "Bekasi, Indonesia",
    image: "https://source.unsplash.com/400x300/?landfill",
    description: "TPA yang dikelola dengan sistem pengolahan modern.",
    lat: -6.2345,
    lon: 106.9987,
  },
];

export default function Home() {
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(106.8456);
  const [lat, setLat] = useState(-6.2088);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl());
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      })
    );

    dummyTPA.forEach((tpa) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([tpa.lon, tpa.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div style='font-family: sans-serif; padding: 10px;'>
              <h3 style='margin-bottom: 5px;'>${tpa.name}</h3>
              <img src='${tpa.image}' alt='${tpa.name}' style='width: 100%; border-radius: 8px;'/>
              <p style='margin: 5px 0;'>${tpa.description}</p>
              <small>${tpa.location}</small>
            </div>`
          )
        )
        .addTo(mapInstance);
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div id="map" className="h-full w-full rounded-lg shadow-lg" />
    </section>
  );
}
