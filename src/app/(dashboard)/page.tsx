import { Metadata } from "next";
import 'leaflet/dist/leaflet.css';
import '@/styles/globals.css';
import About from "./about/page";


export const metadata: Metadata = {
  title: "TrashLinker",
  description: "This is Home for TrashLinker",
  
  // other metadata
};

export default function Page() {
  return (
    <main>
    <link rel="icon" href="/logo_trashlinker.png" />
      <About />
    </main>
  );
}
