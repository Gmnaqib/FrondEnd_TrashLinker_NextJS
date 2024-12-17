"use client"
import React, { useState } from 'react'
import CardLeader from '@/components/CardLeader';
import { Leaderboard } from '@/models/Leaderboard';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardContent from '@/components/CardContent';
import { Postingan } from '@/models/Postingan';
import { Pagination } from 'swiper/modules';

import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';


export default function page() {

  const items: Leaderboard[] = [
    { id: 1, name: 'Dewa Tri Wijaya', rank: 1, point: 100 },
    { id: 2, name: 'Jane Doe', rank: 2, point: 95 },
    { id: 3, name: 'John Smith', rank: 3, point: 90 },
    { id: 4, name: 'Alice Johnson', rank: 4, point: 85 },
    { id: 5, name: 'John Smith', rank: 3, point: 90 },
    { id: 6, name: 'Alice Johnson', rank: 4, point: 85 },
  ];

  const itemsPostingan: Postingan[] = [
    {
      itemId: 1,
      imageProfile: '/img/ronaldo.jpg',
      name: 'Dewa Tri Wijaya',
      date: '09:00 PM - 19 December 2024',
      title: 'Terjadi Penumpukan Sampah!',
      description: 'Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.',
      imageBefore: '/img/img_before.png',
      imageAfter: '/img/img_after.png',
      city: 'Kota Bandung',
      tpa: 'Ciparay',
      dateVolunteer: '19 October 2023',
      volunteer: 12
    },
    {
      itemId: 2,
      imageProfile: '/img/ronaldo.jpg',
      name: 'Dewa Tri Wijaya',
      date: '09:00 PM - 19 December 2024',
      title: 'Terjadi Penumpukan Sampah!',
      description: 'Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.',
      imageBefore: '/img/img_before.png',
      imageAfter: '/img/img_after.png',
      city: 'Kota Bandung',
      tpa: 'Ciparay',
      dateVolunteer: '19 October 2023',
      volunteer: 12
    },
    {
      itemId: 3,
      imageProfile: '/img/ronaldo.jpg',
      name: 'Dewa Tri Wijaya',
      date: '09:00 PM - 19 December 2024',
      title: 'Terjadi Penumpukan Sampah!',
      description: 'Penumpukan sampah terjadi akibat akumulasi sampah yang tidak terkelola dengan baik sehingga menumpuk di suatu lokasi. Kondisi ini umumnya terjadi karena faktor kurangnya fasilitas pengelolaan sampah, minimnya kesadaran masyarakat dalam menjaga kebersihan, serta keterbatasan sistem pengangkutan dan pembuangan sampah.',
      imageBefore: '/img/img_before.png',
      imageAfter: '/img/img_after.png',
      city: 'Kota Bandung',
      tpa: 'Ciparay',
      dateVolunteer: '19 October 2023',
      volunteer: 12
    }
  ];


  return (
    <div>
      <div style={{ height: '100vh' }}>
        <h2 className="text-black text-2xl font-bold mb-4">LeaderBoard</h2>


        <Swiper
          spaceBetween={20}
          grabCursor={true}
          breakpoints={{
            // For screens wider than 1024px
            1024: {
              slidesPerView: 5,  // 5 items per view
            },
            // For screens wider than 768px but less than 1024px
            768: {
              slidesPerView: 3,  // 3 items per view
            },
            // For screens wider than 480px but less than 768px
            480: {
              slidesPerView: 2,  // 2 items per view
            },
            // For screens smaller than 480px
            0: {
              slidesPerView: 1,  // 1 item per view
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
        </Swiper>



        <div className="flex flex-col items-center justify-center w-full">
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
  )
}
