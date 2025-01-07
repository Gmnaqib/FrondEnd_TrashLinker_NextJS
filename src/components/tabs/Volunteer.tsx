"use client";
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


const Volunteer = () => {
  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex justify-center lg:gap-8 xl:gap-32.5">
            <h1>Volunteer</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Volunteer;
