import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardContent from "@/components/Card/CardContent";
import "@/styles/globals.css";
import axios from "axios";

const PostinganHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number | "">("");
  const [filtered, setFiltered] = useState(false);
  const [itemsPostingan, setItemsPostingan] = useState<PostinganItem[]>([]);
  const [joinedPosts, setJoinedPosts] = useState<number[]>([]);
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

      const fetchData = async () => {
        try {
          let url = `${apiUrl}/posts`;

          if (filtered && radius !== "") {
            url += `?radius=${radius}`;
          }

          const response = await axios.get(url, {
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

      fetchData();
    }
  }, [filtered, radius]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchJoinedPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/volunteer/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 && response.data?.data) {
          setJoinedPosts(
            response.data.data.map((volunteer: any) => volunteer.postId)
          );
        }
      } catch (error) {
        console.error("Gagal memuat data volunteer:", error);
      }
    };

    fetchJoinedPosts();
  }, []);

  const handleFilter = () => {
    setFiltered(true);
  };

  const handleVolunteerClick = async (postId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk menjadi volunteer.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/volunteer/join`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Berhasil bergabung sebagai volunteer!");
        setJoinedPosts((prev) => [...prev, Number(postId)]);
      } else {
        alert("Berhasil bergabung sebagai volunteer!");
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
    <section className="overflow-hidden py-6">
      <div className="mx-auto max-w-3xl p-4">
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Filter Postingan</h2>
          <div className="flex gap-2 items-center mb-4">
            <input
              type="number"
              value={radius}
              onChange={(e) =>
                setRadius(e.target.value !== "" ? Number(e.target.value) : "")
              }
              placeholder="Masukkan radius (km)"
              className="border px-2 py-1 rounded w-50"
            />
            <button
              onClick={handleFilter}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-4">
          {itemsPostingan.map(
            (item) => (
              console.log("Post ID:", item.id, "Joined Posts:", joinedPosts),
              console.log("isJoined:", Number(joinedPosts) == Number(item.id)),
              (
                <CardContent
                  key={item.id}
                  imageProfile="img/profile.jpg"
                  name={item.userName}
                  date={new Date(item.createdAt).toLocaleString()}
                  title={item.title}
                  description={item.description}
                  imageBefore={`${apiUrl}${item.image}`}
                  type={item.type}
                  city={item.fullAddress}
                  tpa={item.tpaName}
                  isJoined={joinedPosts.includes(Number(item.id))}
                  dateVolunteer={item.schedule}
                  volunteer={item.volunteerCount}
                  onVolunteerClick={() => handleVolunteerClick(item.id)}
                />
              )
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PostinganHome;
