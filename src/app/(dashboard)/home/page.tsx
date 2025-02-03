"use client";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { useState } from "react";
import { useEffect } from "react";
import Postingan from "@/components/tabs/Postingan";
import Volunteer from "@/components/tabs/Volunteer";
import Tabs from "@/components/tabs/Tabs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardLeader from "@/components/Card/CardLeader";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function page() {

  interface Leader {
    userId: string;
    username: string;
    totalActivities: number;
    rank: number;
  }

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/auth/signin");
    return;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/signin");
      return;
    }

    axios
      .get("http://178.128.221.26:3000/volunteer/leaderboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setLeaders(response.data))
      .catch((error) => console.error("Error fetching leaderboard data:", error));
  }, [router]);

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


                {leaders.map((item, index) => (
                  <div key={item.userId || index} className={`${index < 5 ? "block" : "hidden"} lg:block`}>
                    <CardLeader
                      imageUrl="img/profile.jpg"
                      name={item.username}
                      points={item.totalActivities}
                      rank={item.rank || index + 1}
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
