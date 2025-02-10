"use client";
import { useState, useEffect } from "react";
import Postingan from "./PostinganHome";
import ReportProfile from "../profile/ReportProfile";
import VolunteerHome from "./VolunteerHome";

const TabsHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [role, setRole] = useState("USER"); // Default ke USER

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const userRole = user?.role || null;
    setRole(userRole);
  }, []);

  const tabs =
    role === "COMMUNITY"
      ? [
          { id: 0, title: "Postingan", component: <Postingan /> },
          { id: 1, title: "Report", component: <ReportProfile /> },
        ]
      : [
          { id: 0, title: "Postingan", component: <Postingan /> },
          { id: 1, title: "Dikerjakan", component: <VolunteerHome /> },
        ];

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Tabs Navigation */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 text-center font-semibold border-b-2 ${
              activeTab === tab.id
                ? "border-green-500 text-green-500"
                : "border-transparent text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default TabsHome;
