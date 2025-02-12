import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";
import CardReport from "./CardReport";
import axios from "axios";

const ReportProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  interface PostinganItem {
    id: string;
    userName: string;
    createdAt: string;
    title: string;
    description: string;
    image: string;
    type: string;
    userAddress: string;
    fullAddress: string;
    tpaName: string;
    schedule: string;
    volunteerCount: number;
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
          const response = await axios.get(`${apiUrl}/posts/report`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.data?.data) {
            setItemsPostingan(response.data.data);
          }
        } catch (error) {
          setError("Gagal memuat data");
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, []);

  const handleReportToVolunteerClick = async (postId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk menjadi volunteer.");
      return;
    }

    try {
      const response = await axios.patch(
        `${apiUrl}/posts/${postId}/addVolunteer`,
        {
          type: "Volunteer",
          schedule: "2025-01-11 17:30:03.000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Berhasil Status Report Menjadi Volunteer!");
    } catch (error: any) {
      alert(
        `Gagal bergabung: ${
          error.response?.data?.message || "Terjadi kesalahan"
        }`
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="overflow-hidden py-6">
      <div className="mx-auto max-w-3xl p-4">
        <div className="mt-6 flex flex-col items-center gap-4">
          {itemsPostingan.map((item) => (
            <CardReport
              key={item.id}
              imageProfile="img/profile.jpg"
              name={item.userName}
              date={new Date(item.createdAt).toLocaleString()}
              title={item.title}
              description={item.description}
              imageBefore={`${apiUrl}${item.image}`}
              type={item.type}
              city={item.fullAddress}
              tpa={item.tpaName || "Tidak Ada TPA"}
              dateVolunteer={new Date(item.schedule).toLocaleDateString()}
              volunteer={item.volunteerCount ?? 0}
              onVolunteerClick={() => handleReportToVolunteerClick(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportProfile;
