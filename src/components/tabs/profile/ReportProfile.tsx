import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";
import CardReport from "./CardReport";

const ReportProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const router = useRouter();

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
          const response = await fetch("http://178.128.221.26:3000/posts/report", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          if (data && data.data) {
            setItemsPostingan(data.data);
          }
        } catch  {
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
      const response = await fetch(`http://178.128.221.26:3000/posts/${postId}/addVolunteer`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Volunteer",
          schedule: "2025-01-11 17:30:03.000",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Berhasil bergabung sebagai volunteer!");
      } else {
        alert(`Gagal bergabung: ${data.message || "Terjadi kesalahan"}`);
      }
    } catch  {
      alert("Terjadi kesalahan saat menghubungi server.");
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
              imageBefore={`http://178.128.221.26:3000${item.image}`}
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
