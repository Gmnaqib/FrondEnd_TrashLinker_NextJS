import { Metadata } from "next";
import 'leaflet/dist/leaflet.css';
import '@/styles/globals.css';
import About from "./about/page";


export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Page() {
  return (
    <main>
      <About />
    </main>
  );
}
