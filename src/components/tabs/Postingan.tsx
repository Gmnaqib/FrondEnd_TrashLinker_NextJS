import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardContent from "@/components/Card/CardContent";
import "@/styles/globals.css";

const Postingan = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface PostinganItem {
    id: string;
    userName: string;
    createdAt: string;
    title: string;
    description: string;
    image: string;
    userAddress: string;
    tpaName: string;
    schedule: string;
    volunteer: number;
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
          const response = await fetch("http://178.128.221.26:3000/posts", {
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

          console.log(data);
        } catch (err) {
          setError("Gagal memuat data");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [router]);

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
                  imageAfter={item.image}
                  city={item.userAddress}
                  tpa={item.tpaName}
                  dateVolunteer={new Date(item.schedule).toLocaleDateString()}
                  volunteer={item.volunteer}
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
