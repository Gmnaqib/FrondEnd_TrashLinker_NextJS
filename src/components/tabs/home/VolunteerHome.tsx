"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardContent from "@/components/Card/CardVolunteer";
import axios from "axios";

const VolunteerHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Interface untuk COMMUNITY (Laporan)
  interface CommunityPostingan {
    id: string;
    userName: string;
    createdAt: string;
    title: string;
    description: string;
    image: string;
    type: string;
    userAddress: string;
    tpaName: string;
    schedule: string;
    volunteerCount: number;
  }

  // Interface untuk USER (Volunteer)
  interface UserPostingan {
    checkin: number;
    volunteerId: number;
    postVolunteerId: number;
    createdAt: string;
    updatedAt: string;
    title: string;
  }

  // Union Type untuk menangani kedua jenis postingan
  type PostinganItem = CommunityPostingan | UserPostingan;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const userRole = user?.role || "USER";

      setRole(userRole);

      if (!token) {
        router.push("/auth/signin");
        return;
      }

      const fetchPosts = async () => {
        try {
          const url =
            userRole === "COMMUNITY"
              ? `${apiUrl}/posts/report`
              : `${apiUrl}/volunteer/me`;

          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          setItemsPostingan(response.data.data);
        } catch (error) {
          setError("Gagal memuat data");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, []);

  const handleCheckin = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.patch(
        `${apiUrl}/volunteer/${id}`,
        { checkin: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response body:", response.data);

      setItemsPostingan((prev) =>
        prev.map((item) =>
          "postVolunteerId" in item && item.postVolunteerId === id
            ? { ...item, checkin: 1 }
            : item
        )
      );
    } catch (error) {
      setError("Gagal melakukan check-in");
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`${apiUrl}/volunteer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setItemsPostingan((prev) =>
        prev.filter((item) =>
          "postVolunteerId" in item ? item.postVolunteerId !== id : true
        )
      );
    } catch (error) {
      setError("Gagal membatalkan");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="overflow-hidden py-6">
      <div className="mx-auto max-w-3xl p-4">
        <div className="flex justify-center">
          <div className="bg-white w-full flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">
              {role === "COMMUNITY" ? "Laporan Postingan" : "Daftar Volunteer"}
            </h2>
            {itemsPostingan.map((item) => (
              <div
                key={"postVolunteerId" in item ? item.postVolunteerId : item.id}
                className="w-full max-w-[800px]"
              >
                <CardContent
                  title={item.title}
                  createdAt={
                    "schedule" in item ? item.schedule : item.createdAt
                  }
                  onCheckinClick={() =>
                    handleCheckin(
                      "postVolunteerId" in item
                        ? Number(item.postVolunteerId)
                        : Number(item.id)
                    )
                  }
                  onCancelClick={() =>
                    handleCancel(
                      "postVolunteerId" in item
                        ? Number(item.postVolunteerId)
                        : Number(item.id)
                    )
                  }
                  isCheckedIn={"checkin" in item && item.checkin === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerHome;
