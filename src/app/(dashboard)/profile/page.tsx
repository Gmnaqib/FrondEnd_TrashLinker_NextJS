"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
      .get("http://178.128.221.26:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/signin"); // Redirect to login page
  };

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 flex justify-center items-center">
          <span className="text-gray-700 font-semibold">Loading...</span>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 flex justify-center items-center">
          <span className="text-gray-700 font-semibold">Error loading data</span>
        </div>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-center mb-6 space-y-3">
          <img
            src="img/profile.jpg"
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
          <span className="text-sm text-gray-500 capitalize">{user.role}</span>
        </div>

        <div className="space-y-5">
          <ProfileItem label="Email" value={user.email} />
          <ProfileItem label="Username" value={user.username} />
          <ProfileItem label="Address" value={user.address} />
          <ProfileItem label="Location" value={`${user.latitude}, ${user.longitude}`} />
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

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