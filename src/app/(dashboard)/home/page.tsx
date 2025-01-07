"use client";
import React, { useState } from "react";
import CardLeader from "@/components/Card/CardLeader";
import { Leaderboard } from "@/models/Leaderboard";
import { Swiper, SwiperSlide } from "swiper/react";
import CardContent from "@/components/Card/CardContent";
import { PostinganModel } from "@/models/Postingan";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

const Home = async () => {
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

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted with email:", email);
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center justify-center lg:gap-8 xl:gap-32.5">
            
            <div className="bg-white">
              <h2>Hallo</h2>
            </div>

            <div className=" md:w-1/2">
              <h2 className="text-black text-2xl font-bold mb-4">
                LeaderBoard
              </h2>

              {/* <Swiper
                spaceBetween={20}
                grabCursor={true}
                
                breakpoints={{
                  // For screens wider than 1024px
                  1024: {
                    slidesPerView: 5, // 5 items per view
                  },
                  // For screens wider than 768px but less than 1024px
                  768: {
                    slidesPerView: 3, // 3 items per view
                  },
                  // For screens wider than 480px but less than 768px
                  480: {
                    slidesPerView: 2, // 2 items per view
                  },
                  // For screens smaller than 480px
                  0: {
                    slidesPerView: 1, // 1 item per view
                  },
                }}
              >
                {items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <CardLeader
                      imageUrl="img/ronaldo.jpg"
                      name={item.name}
                      points={item.point}
                      rank={item.rank}
                    />
                  </SwiperSlide>
                ))}
              </Swiper> */}

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

export default Home;
