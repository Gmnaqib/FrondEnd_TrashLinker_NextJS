"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "@mapbox/mapbox-gl-geocoder";
import "@/styles/globals.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { user } from "@nextui-org/theme";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
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
        <div className="space-y-5">
          <ProfileItem label="Email" value={user.email} />
          <ProfileItem label="Username" value={user.username} />
          <ProfileItem label="Address" value={user.address} />
          <ProfileItem
            label="Location"
            value={`${user.latitude}, ${user.longitude}`}
          />
        </div>

        <EditProfileMap user={user}/>
        <button
          onClick={handleLogout}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
      {/* {isModalOpen && <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />} */}
    </section>
  );
}

const EditProfileMap = ({user}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [longitude, setLongitude] = useState(user.longitude);
  const [latitude, setLatitude] = useState(user.latitude);
  const [address, setAddress] = useState(user.address);
  

  useEffect(() => {
    // Inisialisasi Peta
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 14,
    });

    // Tambahkan Marker
    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current);

    // Event saat marker dipindahkan
    markerRef.current.on("dragend", updatePosition);

    // Event saat user klik peta
    mapRef.current.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      updateMarkerPosition(lng, lat);
    });

    return () => mapRef.current.remove(); // Cleanup saat unmount
  }, []);

  // Fungsi untuk update posisi marker dan input
  const updateMarkerPosition = (lng, lat) => {
    setLongitude(lng);
    setLatitude(lat);
    markerRef.current.setLngLat([lng, lat]);
    reverseGeocode(lng, lat);
  };

  // Fungsi saat marker selesai dipindahkan
  const updatePosition = () => {
    const newLngLat = markerRef.current.getLngLat();
    updateMarkerPosition(newLngLat.lng, newLngLat.lat);
  };

  // Reverse Geocoding: Mendapatkan alamat dari koordinat
  const reverseGeocode = async (lng, lat) => {
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
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ address, longitude, latitude }),
      });
      if (!response.ok) throw new Error("Gagal menyimpan data");
      alert("Data berhasil disimpan!");
    } catch (error) {

      alert("Terjadi kesalahan: " + error.message);
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
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full"
      >
        Simpan Perubahan
      </button>
    </div>
  );
};

// const EditProfileModal = ({ user, onClose }: { user: User; onClose: () => void }) => {
//   const [formData, setFormData] = useState({
//     email: user.email,
//     username: user.username,
//     address: user.address,
//     latitude: user.latitude,
//     longitude: user.longitude,
//   });
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markerRef = useRef<mapboxgl.Marker | null>(null);

//   useEffect(() => {
//     if (!mapContainerRef.current) return;
//     if (mapRef.current) {
//       mapRef.current.resize();
//     }

//     // Pastikan latitude dan longitude berada dalam rentang yang benar
//     let lat = formData.latitude;
//     let lng = formData.longitude;

//     if (isNaN(lat) || lat < -90 || lat > 90) lat = -6.2088; // Default ke Jakarta
//     if (isNaN(lng) || lng < -180 || lng > 180) lng = 106.8456; // Default ke Jakarta

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/light-v11",
//       center: [lng, lat], // Gunakan nilai yang sudah divalidasi
//       zoom: 12,
//     });

//     const marker = new mapboxgl.Marker({ draggable: true })
//       .setLngLat([lng, lat])
//       .addTo(map);

//     marker.on("dragend", () => {
//       const { lng, lat } = marker.getLngLat();
//       setFormData((prev) => ({ ...prev, longitude: lng, latitude: lat }));
//     });

//     const geocoder = new Geocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl,
//       marker: false,
//     });

//     map.addControl(geocoder);

//     geocoder.on("result", (e) => {
//       const { center, place_name } = e.result;
//       setFormData((prev) => ({
//         ...prev,
//         longitude: center[0],
//         latitude: center[1],
//         address: place_name,
//       }));
//       marker.setLngLat([center[0], center[1]]);
//     });

//     mapRef.current = map;
//     markerRef.current = marker;

//     return () => map.remove();
//   }, [formData.latitude, formData.longitude]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//         <div ref={mapContainerRef} className="h-64 w-full mt-2 rounded-lg " /> {/* Perbaikan di sini */}
//       </div>
//     </div>
//   );
// };

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
