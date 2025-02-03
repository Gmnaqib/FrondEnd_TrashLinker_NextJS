"use client";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardContent from "@/components/Card/CardVolunteer";

const Volunteer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const router = useRouter();

  interface PostinganItem {
    id: number;
    checkin: number;
    userId: number;
    postId: number;
    createdAt: string;
    updatedAt: string;
    title: string;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
        return;
      }

      const fetchPosts = async () => {
        try {
          const response = await fetch("http://178.128.221.26:3000/volunteer/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Gagal memuat data");
          
          const data = await response.json();
          setItemsPostingan(data);
        } catch (err) {
          setError("Gagal memuat data");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [router]);

  const handleCheckin = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://178.128.221.26:3000/volunteer/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkin: 1 }),
      });

      if (!response.ok) throw new Error("Gagal melakukan check-in");
      
      setItemsPostingan((prev) => prev.map((item) =>
        item.id === id ? { ...item, checkin: 1 } : item
      ));
    } catch (err) {
      setError("Gagal melakukan check-in");
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://178.128.221.26:3000/volunteer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Gagal membatalkan");
      
      setItemsPostingan((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Gagal membatalkan");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-c-1390">
        <div className="flex justify-center">
          <div className="bg-white w-full flex flex-col items-center">
            {itemsPostingan.map((item) => (
              <div key={item.id} className="w-full max-w-[800px]">
                <CardContent
                  key={item.id}
                  title={item.title}
                  createdAt={new Date(item.updatedAt).toLocaleDateString()}
                  onCheckinClick={() => handleCheckin(item.id)}
                  onCancelClick={() => handleCancel(item.id)}
                  isCheckedIn={item.checkin === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
