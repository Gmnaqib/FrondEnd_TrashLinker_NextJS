"use client";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardContent from "@/components/Card/CardVolunteer";

const VolunteerHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

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

  // Menggunakan Union Type agar bisa menangani kedua jenis postingan
  type PostinganItem = CommunityPostingan | UserPostingan;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const userRole = user?.role || "USER"; // Default ke "USER" jika tidak ada role

      setRole(userRole);

      if (!token) {
        router.push("/auth/signin");
        return;
      }

      const fetchPosts = async () => {
        try {
          const url =
            userRole === "COMMUNITY"
              ? "http://178.128.221.26:3000/posts/report"
              : "http://178.128.221.26:3000/volunteer/me";

          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Gagal memuat data");

          const data = await response.json();
          setItemsPostingan(data.data || []);
        } catch  {
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

      const response = await fetch(
        `http://178.128.221.26:3000/volunteer/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checkin: 1 }),
        }
      );

      if (!response.ok) throw new Error("Gagal melakukan check-in");

      setItemsPostingan((prev) =>
        prev.map((item) =>
          "postVolunteerId" in item && item.postVolunteerId === id
            ? { ...item, checkin: 1 }
            : item
        )
      );
    } catch  {
      setError("Gagal melakukan check-in");
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `http://178.128.221.26:3000/volunteer/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Gagal membatalkan");

      setItemsPostingan((prev) =>
        prev.filter((item) =>
          "postVolunteerId" in item ? item.postVolunteerId !== id : true
        )
      );
    } catch  {
      setError("Gagal membatalkan");
    }
  };

  // const handleConvertToVolunteer = async (id: string, schedule: string) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     const response = await fetch(
  //       `http://178.128.221.26:3000/posts/${id}/addVolunteer`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           type: "Volunteer",
  //           schedule: schedule, // Format: "YYYY-MM-DD HH:mm:ss"
  //         }),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Gagal mengubah ke Volunteer");

  //     // Perbarui state setelah berhasil
  //     setItemsPostingan((prev) =>
  //       prev.map((item) =>
  //         "id" in item && item.id === id
  //           ? { ...item, type: "Volunteer", schedule }
  //           : item
  //       )
  //     );
  //   } catch (err) {
  //     setError("Gagal mengubah ke Volunteer");
  //   }
  // };

  // const handleCancelVolunteer = async (id: string) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     const response = await fetch(
  //       `http://178.128.221.26:3000/posts/${id}/addVolunteer`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           type: "Report",
  //           schedule: null,
  //         }),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Gagal membatalkan Volunteer");

  //     // Perbarui state setelah berhasil
  //     setItemsPostingan((prev) =>
  //       prev.map((item) =>
  //         "id" in item && item.id === id
  //           ? { ...item, type: "Report", schedule: "" }
  //           : item
  //       )
  //     );
  //   } catch (err) {
  //     setError("Gagal membatalkan Volunteer");
  //   }
  // };

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

            {itemsPostingan.map((item) => {
              if ("postVolunteerId" in item) {
                return (
                  <div
                    key={item.postVolunteerId}
                    className="w-full max-w-[800px]"
                  >
                    <CardContent
                      key={item.postVolunteerId}
                      title={item.title}
                      createdAt={new Date(item.updatedAt).toLocaleDateString()}
                      onCheckinClick={() => handleCheckin(item.postVolunteerId)}
                      onCancelClick={() => handleCancel(item.postVolunteerId)}
                      isCheckedIn={item.checkin === 1}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerHome;
