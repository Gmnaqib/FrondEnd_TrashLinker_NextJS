import React, { useState } from "react";
import { Leaderboard } from "@/models/Leaderboard";
import CardContent from "@/components/Card/CardContent";
import { PostinganModel } from "@/models/Postingan";

import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Postingan = () => {
  const items: Leaderboard[] = [
    { id: 1, name: "Dewa Tri Wijaya", rank: 1, point: 100 },
    { id: 2, name: "Jane Doe", rank: 2, point: 95 },
    { id: 3, name: "John Smith", rank: 3, point: 90 },
    { id: 4, name: "Alice Johnson", rank: 4, point: 85 },
    { id: 5, name: "John Smith", rank: 3, point: 90 },
    { id: 6, name: "Alice Johnson", rank: 4, point: 85 },
  ];

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Pastikan hanya akses localStorage di sisi klien
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      // Jika token tidak ada, arahkan ke halaman login
      if (!token) {
        router.push("/auth/signin"); // Ganti dengan path halaman login kamu
      } else {
        setLoading(false); // Jika token ada, set loading false
      }
    }
  }, [router]);

  // Tampilkan loading sementara memeriksa token
  if (loading) {
    return <div>Loading...</div>;
  }

  const itemsPostingan: PostinganModel[] = [
    {
      itemId: 1,
      imageProfile: "/img/ronaldo.jpg",
      name: "Dewa Tri Wijaya",
      date: "09:00 PM - 19 December 2024",
      title: "Terjadi Penumpukan Sampah!",
      description:
        "Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.",
      imageBefore: "/img/img_before.png",
      imageAfter: "/img/img_after.png",
      city: "Kota Bandung",
      tpa: "Ciparay",
      dateVolunteer: "19 October 2023",
      volunteer: 12,
    },
    {
      itemId: 2,
      imageProfile: "/img/ronaldo.jpg",
      name: "Dewa Tri Wijaya",
      date: "09:00 PM - 19 December 2024",
      title: "Terjadi Penumpukan Sampah!",
      description:
        "Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.",
      imageBefore: "/img/img_before.png",
      imageAfter: "/img/img_after.png",
      city: "Kota Bandung",
      tpa: "Ciparay",
      dateVolunteer: "19 October 2023",
      volunteer: 12,
    },
    {
      itemId: 3,
      imageProfile: "/img/ronaldo.jpg",
      name: "Dewa Tri Wijaya",
      date: "09:00 PM - 19 December 2024",
      title: "Terjadi Penumpukan Sampah!",
      description:
        "Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.",
      imageBefore: "/img/img_before.png",
      imageAfter: "/img/img_after.png",
      city: "Kota Bandung",
      tpa: "Ciparay",
      dateVolunteer: "19 October 2023",
      volunteer: 12,
    },
  ];

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-c-1390 ">
          <div className="flex justify-center">
            {/* Card Leaderboard */}
            <div className="bg-white"></div>

            {/*Card Postingan*/}
            <div className="bg-white">
              <div className="flex flex-col items-center w-full">
                {itemsPostingan.map((item) => (
                  <div key={item.itemId}>
                    <CardContent
                      imageProfile={item.imageProfile}
                      name={item.name}
                      date={item.date}
                      title={item.title}
                      description={item.description}
                      imageBefore={item.imageBefore}
                      imageAfter={item.imageAfter}
                      city={item.city}
                      tpa={item.tpa}
                      dateVolunteer={item.dateVolunteer}
                      volunteer={item.volunteer}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default Postingan;