"use client";
import React from 'react'
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/styles/globals.css';

// Dynamically load the Map component (to avoid server-side rendering issues)
const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

export default function Home() {
  return (
    <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <Map />
    </section>
  );
}