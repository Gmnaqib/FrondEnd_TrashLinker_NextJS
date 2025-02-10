"use client";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useRouter } from "next/navigation";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZGV3YXRyaSIsImEiOiJjbHR2Y2VndTgwaHZuMmtwOG0xcWk0eTlwIn0.tp1jXAL6FLd7DKwgOW--7g";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    address: "",
    longitude: 0,
    latitude: 0,
    role: "",
  });

  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.816666, -6.2], // Default center (Jakarta)
        zoom: 10,
      });
      mapRef.current = map;

      // Initialize the Geocoder and add it directly to the map
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        placeholder: "Search for your address",
      });
      map.addControl(geocoder, "top-left"); // Adding geocoder to the map directly

      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        })
      );
  

      geocoder.on("result", (e) => {
        // When a result is selected from the geocoder
        const { place_name, geometry } = e.result;
        const [longitude, latitude] = geometry.coordinates;

        setData((prevData) => ({
          ...prevData,
          address: place_name,
          longitude: longitude.toString(),
          latitude: latitude.toString(),
        }));

        // Remove existing marker and add a new one
        if (markerRef.current) {
          markerRef.current.remove();
        }
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);

        // Adjust the map to the new location
        map.flyTo({ center: [longitude, latitude], zoom: 14 });
      });

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        // Use reverse geocoding to fetch the address based on coordinates
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
          )
          .then((response) => {
            const address =
              response.data.features[0]?.place_name || "Unknown Location";

            setData((prevData) => ({
              ...prevData,
              address: address,
              longitude: lng,
              latitude: lat,
            }));

            // Remove existing marker and add a new one
            if (markerRef.current) {
              markerRef.current.remove();
            }
            markerRef.current = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(map);
          })
          .catch((error) => {
            console.error("Error fetching address for click:", error);
          });
      });
    }
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://178.128.221.26:3000/user/register",
        data
      );
      console.log("Response:", response.data);

      const { token, ...user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={data.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="USER">Masyarakat</option>
            <option value="COMMUNITY">Komunitas</option>
          </select>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <label className="block text-gray-700 font-medium">
            Full Address
          </label>
          <input
            name="address"
            type="text"
            value={data.address}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div ref={mapContainerRef} className="h-64 w-full mt-2 rounded-lg" />
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Signup;
