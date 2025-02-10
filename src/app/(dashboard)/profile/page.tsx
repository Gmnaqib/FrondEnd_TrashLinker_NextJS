"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@/styles/globals.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import TabsProfile from "@/components/tabs/profile/TabsProfile";



mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV3YXRyaSIsImEiOiJjbHR2Y2VndTgwaHZuMmtwOG0xcWk0eTlwIn0.tp1jXAL6FLd7DKwgOW--7g";

interface User {
  email: string;
  username: string;
  role: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get(`http://178.128.221.26:3000/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => router.push("/auth/signin"), 500);
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  if (loading || user === null) {
    return <LoadingScreen />;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-16 space-y-6 pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46 ">
  {/* Card Profile */}
  <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
    <div className="flex flex-col items-center mb-6 space-y-3">
      <img
        src="/img/profile.jpg"
        alt="Profile"
        className="w-28 h-28 object-cover rounded-full shadow-lg"
      />
      <h2 className="text-2xl font-semibold text-gray-800">
        {user.username}
      </h2>
      <span className="text-sm text-gray-500 capitalize">{user.role}</span>
    </div>

    {/* Informasi Profil */}
    <div className="space-y-5">
      <ProfileItem label="Email" value={user.email} />
      <ProfileItem label="Username" value={user.username} />
      <ProfileItem label="Address" value={user.address} />
      <ProfileItem
        label="Location"
        value={`${user.latitude}, ${user.longitude}`}
      />
    </div>

    {/* Peta Edit Profile */}
    <EditProfileMap user={user} />

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
    >
      Logout
    </button>
  </div>

  {/* Card Tabs */}
  <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6">
    <TabsProfile />
  </div>
</section>

  );
}

const EditProfileMap = ({ user }: { user: User }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [longitude, setLongitude] = useState(user.longitude);
  const [latitude, setLatitude] = useState(user.latitude);
  const [address, setAddress] = useState(user.address);

  useEffect(() => {
    // Inisialisasi Peta
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 14,
      });
    }

    // Tambahkan Marker
    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([longitude, latitude]);

    if (mapRef.current) {
      markerRef.current.addTo(mapRef.current);
    }

    // Event saat marker dipindahkan
    markerRef.current.on("dragend", updatePosition);

    // Event saat user klik peta
    mapRef.current?.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      updateMarkerPosition(lng, lat);
    });

    return () => mapRef.current?.remove(); // Cleanup saat unmount
  }, []);

  // Fungsi untuk update posisi marker dan input
  const updateMarkerPosition = (lng: React.SetStateAction<number>, lat: React.SetStateAction<number>) => {
    setLongitude(lng);
    setLatitude(lat);
    markerRef.current?.setLngLat([lng as number, lat as number]);
    reverseGeocode(lng, lat);
  };

  // Fungsi saat marker selesai dipindahkan
  const updatePosition = () => {
    const newLngLat = markerRef.current?.getLngLat();
    if (!newLngLat) return;
    updateMarkerPosition(newLngLat.lng, newLngLat.lat);
  };

  // Reverse Geocoding: Mendapatkan alamat dari koordinat
  const reverseGeocode = async (lng: React.SetStateAction<number>, lat: React.SetStateAction<number>) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        setAddress(data.features[0].place_name);
      }
    } catch (error) {
      console.error("Gagal mendapatkan alamat:", error);
    }
  };

  const token = localStorage.getItem("token");
  const router = useRouter(); // Add this line
  if (!token) {
    router.push("/auth/signin");
    return;
  }

  // Fungsi untuk Mengirim Data ke API
  const handleSave = async () => {
    try {
      console.log("token", token);
      const response = await fetch("http://178.128.221.26:3000/user/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address, longitude, latitude }),
      });
      if (!response.ok) throw new Error("Gagal menyimpan data");
      alert("Data berhasil disimpan!");
    } catch (error) {
      if (error instanceof Error) {
        alert("Terjadi kesalahan: " + error.message);
      } else {
        alert("Terjadi kesalahan yang tidak diketahui");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Edit Location</h2>
      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "300px", borderRadius: "10px" }}
      ></div>

      <div className="mt-4">
        <label className="block font-medium">Alamat</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block font-medium">Latitude</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            className="border p-2 w-full rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md w-full"
      >
        Simpan Perubahan
      </button>
    </div>
  );
};

interface ProfileItemProps {
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800 text-sm">{value}</span>
  </div>
);

const LoadingScreen = () => (
  <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
    <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 flex justify-center items-center">
      <span className="text-gray-700 font-semibold">Loading...</span>
    </div>
  </section>
);
