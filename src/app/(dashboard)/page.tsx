import { Metadata } from "next";
import Home from "./home/page";

import 'leaflet/dist/leaflet.css';
import '@/styles/globals.css';


export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Page() {
  return (
    <main>
      <Home />
    </main>
  );
}
