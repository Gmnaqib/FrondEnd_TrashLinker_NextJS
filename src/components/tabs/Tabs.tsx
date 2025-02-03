"use client";

import { useState } from "react";
import Postingan from "./Postingan";
import Volunteer from "./Volunteer";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "Postingan", component: <Postingan /> },
    { id: 1, title: "Volunteer", component: <Volunteer /> },
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
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-blue-500"
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

export default Tabs;
