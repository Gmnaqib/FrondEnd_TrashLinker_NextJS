import React from "react";

export default function Profile() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="images/profile.jpg"
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            John Doe
          </h2>
          <span className="text-gray-500 text-sm">Admin</span>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <ProfileItem label="Email" value="user@example.com" />
          <ProfileItem label="Username" value="john_doe" />
          <ProfileItem label="Address" value="1234 Street Name, City, Country" />
          <ProfileItem label="Location" value="New York, USA" />
        </div>

        
      </div>
    </section>
  );
}

// Component untuk item profil
const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);
