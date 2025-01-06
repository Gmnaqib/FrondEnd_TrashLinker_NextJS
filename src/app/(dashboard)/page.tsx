import { Metadata } from "next";
import Postingan from "../../components/layout/home/page";


export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Postingan />
    </main>
  );
}
