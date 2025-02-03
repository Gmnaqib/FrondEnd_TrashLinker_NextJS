import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardContent from "@/components/Card/CardContent";
import "@/styles/globals.css";

const Postingan = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState(50); // Default radius 50km

  interface PostinganItem {
    id: string;
    userName: string;
    createdAt: string;
    title: string;
    description: string;
    image: string;
    userAddress: string;
    tpaName: string;
    type: string;
    schedule: string;
    volunteer: number;
    volunteerCount: number;
    onVolunteerClick: () => void;
  }

  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/signin");
        return;
      }

      const fetchPosts = async () => {
        try {
          const response = await fetch(`http://178.128.221.26:3000/posts?radius=${radius}`, {
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
        } catch (err) {
          setError("Gagal memuat data");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [radius, router]);

  const handleVolunteerClick = async (postId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk menjadi volunteer.");
      return;
    }

    try {
      const response = await fetch("http://178.128.221.26:3000/volunteer/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Berhasil bergabung sebagai volunteer!");
      } else {
        alert(`Gagal bergabung: ${data.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
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
    <section className="overflow-hidden">
      <div className="mx-auto max-w-c-1390">
        <div className="flex justify-center">
          <div className="bg-white w-full flex flex-col items-center">
            <div className="mb-4">
              <label className="mr-2">Filter Radius (km):</label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              />
            </div>
            {itemsPostingan.map((item) => (
              <div key={item.id} className="w-full max-w-[800px]">
                <CardContent
                  key={item.id}
                  imageProfile="img/profile.jpg"
                  name={item.userName}
                  date={new Date(item.createdAt).toLocaleString()}
                  title={item.title}
                  description={item.description}
                  imageBefore={`http://178.128.221.26:3000${item.image}`}
                  type={item.type}
                  city={item.userAddress}
                  tpa={item.tpaName}
                  dateVolunteer={new Date(item.schedule).toLocaleDateString()}
                  volunteer={item.volunteerCount}
                  onVolunteerClick={() => handleVolunteerClick(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Postingan;
