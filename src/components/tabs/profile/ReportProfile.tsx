import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";
import CardReport from "./CardReport";
import axios from "axios";

const ReportProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [schedule, setSchedule] = useState("");
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

  const handleOpenModal = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
    setSchedule("");
  };

  const handleSubmitSchedule = async () => {
    if (!selectedPostId || !schedule) {
      alert("Harap pilih tanggal terlebih dahulu.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk menjadi volunteer.");
      return;
    }

    try {
      await axios.patch(
        `${apiUrl}/posts/${selectedPostId}/addVolunteer`,
        {
          type: "Volunteer",
          schedule,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Berhasil Status Report Menjadi Volunteer!");
      handleCloseModal();
    } catch (error: any) {
      alert(`Gagal bergabung: ${error.response?.data?.message || "Terjadi kesalahan"}`);
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
              onVolunteerClick={() => handleOpenModal(item.id)}
            />
          ))}
        </div>
      </div>
      {selectedPostId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Pilih Tanggal</h2>
            <input
              type="date"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
              <button onClick={handleSubmitSchedule} className="px-4 py-2 bg-blue-500 text-white rounded">Kirim</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportProfile;
