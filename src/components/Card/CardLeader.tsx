import React from "react";

type CardProps = {
  name: string;
  points: number;
  rank: number;
  imageUrl: string;
};

const CardLeader: React.FC<CardProps> = ({ name, points, rank, imageUrl }) => {
  // Define custom styles for top ranks
  let rankStyle = "bg-green-500 text-white border-green-700"; // Default for rank >= 4
  let rankBadgeStyle = "bg-green-600 text-white";

  if (rank === 1) {
    rankStyle = "bg-yellow-400 text-black border-yellow-600";
    rankBadgeStyle = "bg-yellow-500 text-white";
  } else if (rank === 2) {
    rankStyle = "bg-gray-400 text-black border-gray-600";
    rankBadgeStyle = "bg-gray-500 text-white";
  } else if (rank === 3) {
    rankStyle = "bg-orange-400 text-black border-orange-600";
    rankBadgeStyle = "bg-orange-500 text-white";
  } 

  return (
    <div
      className={`relative flex flex-col items-center rounded-lg shadow-md p-4 m-8 w-52 ${rankStyle}`}
    >
      {/* Profile Image */}
      <div className="relative w-20 h-20 rounded-full border-4 border-white -mt-12">
        <img
          src={imageUrl || "img/default.jpg"} // Default image fallback
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
        {/* Rank Badge */}
        <div
          className={`absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full flex items-center justify-center w-8 h-8 border-2 z-20 ${rankBadgeStyle}`}
        >
          {rank}
        </div>
      </div>
      {/* Name and Points */}
      <div className="mt-4 text-center">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm">{points} Points</p>
      </div>
    </div>
  );
};

export default CardLeader;
