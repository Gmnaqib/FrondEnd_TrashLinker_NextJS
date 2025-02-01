import { div } from "framer-motion/client";
import React from "react";

export default function Profile() {
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="min-h-screen flex justify-center bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <img
                src="https://www.w3schools.com/w3images/avatar2.png" // Default avatar image
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              User Profile
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Email:</span>
                <span className="text-gray-600">user@example.com</span>
              </div>

              {/* Username */}
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Username:</span>
                <span className="text-gray-600">john_doe</span>
              </div>

              {/* Address */}
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Address:</span>
                <span className="text-gray-600">
                  1234 Street Name, City, Country
                </span>
              </div>

              {/* Role */}
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Role:</span>
                <span className="text-gray-600">Admin</span>
              </div>

              {/* Location */}
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Location:</span>
                <span className="text-gray-600">New York, USA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
