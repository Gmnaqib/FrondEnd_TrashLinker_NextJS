import React from 'react'

type CardProps = {
  name: string;
  points: number;
  rank: number;
  imageUrl: string;
};

const CardLeader: React.FC<CardProps> = ({ name, points, rank, imageUrl }) => {
  return (
    <div className="relative flex flex-col items-center bg-green-500 text-white rounded-lg shadow-md p-4">
  {/* Profile Image */}
  <div className="relative w-20 h-20 rounded-full border-4 border-white -mt-12">
    <img
      src={imageUrl}
      alt={name}
      className="w-full h-full object-cover rounded-full"
    />
    {/* Rank Badge */}
    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-white text-black rounded-full flex items-center justify-center w-8 h-8 border-2 border-green-500 z-20">
      {rank}
    </div>
  </div>
  {/* Name and Points */}
  <div className="mt-4 text-center">
    <h3 className="font-bold text-lg">{name}</h3>
    <p className="text-sm">{points} Point</p>
  </div>
</div>

  );
};

export default CardLeader;
