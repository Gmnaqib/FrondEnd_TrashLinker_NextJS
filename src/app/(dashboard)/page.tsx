import { Metadata } from "next";
import Home from "./home/page";
import AddPostingan from "@/app/(dashboard)/postingan/page";
import Profile from "@/app/(dashboard)/profile/page";


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
