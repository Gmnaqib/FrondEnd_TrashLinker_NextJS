"use client";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { useState } from "react";
import Postingan from "@/components/tabs/Postingan";
import Volunteer from "@/components/tabs/Volunteer";
import Tabs from "@/components/tabs/Tabs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardLeader from "@/components/Card/CardLeader";

export default function page() {
  const [activeTab, setActiveTab] = useState(0);

  const items = [
    { id: 1, name: "John Doe", point: 150, rank: 1 },
    { id: 2, name: "Jane Smith", point: 140, rank: 2 },
    { id: 3, name: "Alice Johnson", point: 130, rank: 3 },
    { id: 4, name: "Bob Brown", point: 120, rank: 4 },
    { id: 5, name: "Charlie White", point: 110, rank: 5 },
    { id: 6, name: "Diana Gray", point: 100, rank: 6 },
    { id: 7, name: "Ethan Black", point: 90, rank: 7 },
    { id: 8, name: "Fiona Green", point: 80, rank: 8 },
    { id: 9, name: "George Blue", point: 70, rank: 9 },
  ];

  const tabs = [
    { id: 0, title: "Postingan", component: <Postingan /> },
    { id: 1, title: "Volunteer", component: <Volunteer /> },
  ];
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="min-h-screen flex justify-center bg-gray-100 p-4">
          {/* Card Container */}
          <div className="flex flex-col md:flex-row flex-wrap gap-4 max-w-6xl w-full">
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 h-auto self-start">
              {/* Title Section */}
              <h2 className="text-xl font-semibold mb-4 text-center">
                Leaderboard
              </h2>

              {/* Content Section */}
              <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg p-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${index < 5 ? "block" : "hidden"} lg:block`}
                  >
                    <CardLeader
                      imageUrl="img/ronaldo.jpg"
                      name={item.name}
                      points={item.point}
                      rank={item.rank}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 md:flex-[2] self-stretch">
              <Tabs />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
