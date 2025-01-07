import { Metadata } from "next";
import Home from "../../components/layout/home/page";
import AddPostingan from "@/components/layout/postingan/page";
import Profile from "@/components/layout/profile/page";


export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Page() {
  return (
    <main>
      <Home />
      <AddPostingan/>
      <Profile />
    </main>
  );
}
