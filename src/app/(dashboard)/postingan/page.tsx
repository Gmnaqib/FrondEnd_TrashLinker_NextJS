"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV3YXRyaSIsImEiOiJjbHR2Y2VndTgwaHZuMmtwOG0xcWk0eTlwIn0.tp1jXAL6FLd7DKwgOW--7g";

const AddPostinganForm = ({ }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
    longitude: 0,
    latitude: 0,
    type: "Report",
    schedule: "",
    tpaId: "",
    fullAddress: "",
  });

  const [tpaList, setTpaList] = useState<{ id: string; tpa_name: string }[]>([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // GET TPA
    axios.get("http://178.128.221.26:3000/tpa").then((response) => {
      setTpaList(response.data.data);
    });

    // GET USER LOCATION
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106.827153, -6.175392],
      zoom: 12,
    });

    const geocoder = new Geocoder({
      accessToken: mapboxgl.accessToken || "",
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search for location",
    });

    map.addControl(geocoder);
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      })
    );
    let marker = new mapboxgl.Marker();

    geocoder.on("result", (e) => {
      const { center, place_name } = e.result;
      setFormData((prevData) => ({
        ...prevData,
        fullAddress: place_name,
        latitude: center[1],
        longitude: center[0],
      }));
      marker.setLngLat(center).addTo(map);
      map.flyTo({ center });
    });

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      marker.setLngLat([lng, lat]).addTo(map);

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.features.length > 0) {
            setFormData((prevData) => ({
              ...prevData,
              fullAddress: data.features[0].place_name,
              latitude: lat,
              longitude: lng,
            }));
          }
        });
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

 

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Menghindari render sebelum redirect

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files && e.target.files.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          image: e.target.files ? e.target.files[0] : null,
        }));
      }
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      formDataToSend.append(key, formData[key] as any);
    });

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    axios
      .post("http://178.128.221.26:3000/posts", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post successfully added", response.data);
        router.push("/home");
      })
      .catch((error) => {
        console.error("Error adding post", error);
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
      });
  };

  return (
    <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Postingan</h2>
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />

          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            rows={4}
            required
          ></textarea>

          <label className="block text-gray-700 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />

          <label className="block text-gray-700 font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option value="Report">Report</option>
            <option value="Volunteer">Volunteer</option>
          </select>

          <label className="block text-gray-700 font-medium">Schedule</label>
          <input
            type="date"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />

          <label className="block text-gray-700 font-medium">TPA</label>
          <select
            name="tpaId"
            value={formData.tpaId}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          >
            <option value="">Select TPA</option>
            {tpaList.map((tpa) => (
              <option key={tpa.id} value={tpa.id}>
                {tpa.tpa_name}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 font-medium">
            Full Address
          </label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            className="w-full border rounded-lg p-2 mt-1"
            readOnly
          />

          <div ref={mapContainerRef} className="h-64 w-full mt-2 rounded-lg" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600"
        >
          Add Postingan
        </button>
      </form>
    </section>
  );
};

export default AddPostinganForm;
