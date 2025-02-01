"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@/styles/globals.css';
import mapboxgl from 'mapbox-gl';

// Set Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiZGV3YXRyaSIsImEiOiJjbHR2Y2VndTgwaHZuMmtwOG0xcWk0eTlwIn0.tp1jXAL6FLd7DKwgOW--7g";//process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Home() {
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(106.8456);
  const [lat, setLat] = useState(-6.2088);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl());
    
    // Add geolocation control
    mapInstance.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    }));

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div id="map" className="h-full w-full" />
    </section>
  );
}
