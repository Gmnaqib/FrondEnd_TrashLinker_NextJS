"use client"
import React, { useState } from 'react'
import '@/styles/globals.css';
import CardLeader from '@/components/CardLeader';
import { Leaderboard } from '@/models/Leaderboard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardContent from '@/components/CardContent';

export default function page() {

  const items: Leaderboard[] = [
    { id: 1, name: 'Dewa Tri Wijaya', rank: 1, point: 100 },
    { id: 2, name: 'Jane Doe', rank: 2, point: 95 },
    { id: 3, name: 'John Smith', rank: 3, point: 90 },
    { id: 4, name: 'Alice Johnson', rank: 4, point: 85 },
    { id: 5, name: 'John Smith', rank: 3, point: 90 },
    { id: 6, name: 'Alice Johnson', rank: 4, point: 85 },
  ];


  return (
    <div>
      <h2 className="text-black text-2xl font-bold mb-4">LeaderBoard</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        direction="horizontal"
        grabCursor={true}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <CardLeader
              key={item.id}
              imageUrl="img/ronaldo.jpg"
              name={item.name}
              points={item.point}
              rank={item.rank}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <CardContent
        imageProfile='/img/ronaldo.jpg'
        name='Dewa Tri Wijaya'
        date='09:00 PM - 19 December 2024'
        title='Terjadi Penumpukan Sampah!'
        description='Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.'
        imageBefore='/img/img_before.png'
        imageAfter='/img/img_after.png'
        city='Kota Bandung'
        tpa='Ciparay'
        dateVolunteer='19 October 2023'
        volunteer={12} 
      ></CardContent>


    </div>

  )
}
