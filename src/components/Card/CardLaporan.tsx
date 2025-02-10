import React from "react";

type CardContentProps = {
  title: string;
  createdAt: string;
  isCheckedIn: boolean;
  onCheckinClick: () => void;
  onCancelClick: () => void;
};

const CardContent: React.FC<CardContentProps> = ({ title, createdAt, isCheckedIn, onCheckinClick, onCancelClick }) => {
  return (
    <div className="relative flex flex-col bg-white text-black rounded-lg shadow-lg p-6 m-4 max-w-lg mx-auto">
      {/* Header Section */}
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <h3 className="text-gray-500 text-sm">{new Date(createdAt).toLocaleDateString()}</h3>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={onCheckinClick}
          disabled={isCheckedIn}
          className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${isCheckedIn ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-400'}`}
        >
          {isCheckedIn ? "Checked-in" : "Check-in"}
        </button>
        <button 
          onClick={onCancelClick}
          disabled={isCheckedIn}
          className={`px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg transition duration-200 ${isCheckedIn ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-400'}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CardContent;