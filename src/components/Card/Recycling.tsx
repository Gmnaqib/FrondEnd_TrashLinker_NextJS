import React from "react";

const RecyclingComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg space-y-4">
      {/* Judul */}
      <div className="text-lg font-semibold bg-gray-800 text-white px-4 py-2 rounded">
        Mari Bergerak
      </div>

      {/* Ikon Recycling */}
      <div className="w-24 h-24">
        <img
          src="logo.png"
          alt="Recycling Icon"
          className="w-full h-full"
        />
      </div>

      {/* Gambar Samping */}
      <div className="flex space-x-4">
        {/* Gambar Sampah */}
        <div className="w-28 h-28 border-2 border-green-500 rounded-lg overflow-hidden">
          <img
            src="img/img_rcycling1.png"
            alt="Trash Bin"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gambar Aktivitas */}
        <div className="flex space-x-2">
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img
              src="img/img_rcycling2.png"
              alt="Activity 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img
              src="img/img_rcycling3.png"
              alt="Activity 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img
              src="img/img_rcycling4.png"
              alt="Activity 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingComponent;