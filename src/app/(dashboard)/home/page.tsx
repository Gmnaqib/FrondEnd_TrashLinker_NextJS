"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CardLeader from "@/components/Card/CardLeader";
import "@/styles/globals.css";
import TabsHome from "@/components/tabs/home/TabsHome";

//Home
export default function Page() {
  interface Leader {
    userId: string;
    username: string;
    totalActivities: number;
    rank: number;
  }

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get("http://178.128.221.26:3000/volunteer/leaderboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setLeaders(response.data.data || [])) // Access response.data.data
      .catch((error) =>
        console.error("Error fetching leaderboard data:", error)
      );
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Menghindari render sebelum redirect

  return (
    <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div className="min-h-screen flex justify-center bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row flex-wrap gap-4 max-w-6xl w-full">
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 h-auto self-start">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Leaderboard
            </h2>
            <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg p-4">
              {leaders.map((item, index) => (
                <div
                  key={item.userId || index}
                  className={`${index < 5 ? "block" : "hidden"} lg:block`}
                >
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
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 md:flex-[2] self-stretch">
            <TabsHome />
          </div>
        </div>
      </div>
    </section>
  );
}
