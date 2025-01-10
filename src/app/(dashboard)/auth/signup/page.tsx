import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Sign Up Page - Solid SaaS Boilerplate",
  description: "This is Sign Up page for Startup Pro",
  // other metadata
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
