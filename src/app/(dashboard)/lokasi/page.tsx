"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import '@/styles/globals.css';

// Set Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiZGV3YXRyaSIsImEiOiJjbHR2Y2VndTgwaHZuMmtwOG0xcWk0eTlwIn0.tp1jXAL6FLd7DKwgOW--7g"; 

export default function Home() {
  //const [map, setMap] = useState<mapboxgl.Map | null>(null);
  interface DataItem {
    longitude: number;
    latitude: number;
    tpaName: string;
    image: string;
    description: string;
    tpaAddress: string;
  }

  const [data, setData] = useState<DataItem[]>([]);
  const [lng] = useState(106.8456);
  const [lat] = useState(-6.2088);
  const [zoom] = useState(12);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    fetch("http://178.128.221.26:3000/posts", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Success") {
          setData(result.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (!data.length) return;

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

    data.forEach((item) => {
      new mapboxgl.Marker()
        .setLngLat([item.longitude, item.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div style='font-family: sans-serif; padding: 10px;'>
              <h3 style='margin-bottom: 5px;'>${item.tpaName}</h3>
              <p style='margin: 5px 0;'>${item.description}</p>
              <small>${item.tpaAddress}</small>
            </div>`
          )
        )
        .addTo(mapInstance);
    });

    //setMap(mapInstance);

    return () => mapInstance.remove();
  }, [data]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div id="map" className="h-full w-full rounded-lg shadow-lg" />
    </section>
  );
}
