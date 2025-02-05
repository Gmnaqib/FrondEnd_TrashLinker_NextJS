"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";

export default function Profile() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-center mb-6 space-y-3">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome to the admin dashboard.</p>
        </div>
      </div>
    </section>
  );
}
