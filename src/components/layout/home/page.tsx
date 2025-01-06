"use client";
import React, { useState } from "react";
import CardLeader from "@/components/Card/CardLeader";
import { Leaderboard } from "@/models/Leaderboard";
import { Swiper, SwiperSlide } from "swiper/react";
import CardContent from "@/components/Card/CardContent";
import { PostinganModel } from "@/models/Postingan";
import { Pagination } from "swiper/modules";

import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

export default function Home() {
  const items: Leaderboard[] = [
    { id: 1, name: "Dewa Tri Wijaya", rank: 1, point: 100 },
    { id: 2, name: "Jane Doe", rank: 2, point: 95 },
    { id: 3, name: "John Smith", rank: 3, point: 90 },
    { id: 4, name: "Alice Johnson", rank: 4, point: 85 },
    { id: 5, name: "John Smith", rank: 3, point: 90 },
    { id: 6, name: "Alice Johnson", rank: 4, point: 85 },
  ];

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
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <h2 className="text-black text-2xl font-bold mb-4">LeaderBoard</h2>
          </div>
        </div>
      </section>
    </>
  );
}
