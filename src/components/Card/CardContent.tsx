import React from "react";

type CardContent = {
  imageProfile: string;
  name: string;
  date: string;
  title: string;
  description: string;
  imageBefore: string;
  city: string;
  tpa: string;
  type: string;
  dateVolunteer: string;
  volunteer: number;
  onVolunteerClick: () => void;
};

const CardContent: React.FC<CardContent> = ({
  imageProfile,
  name,
  date,
  title,
  description,
  imageBefore,
  city,
  tpa,
  type,
  dateVolunteer,
  volunteer,
  onVolunteerClick
}) => {
  return (
    <div className="relative flex flex-col bg-white text-black rounded-lg shadow-lg p-6 m-4 max-w-lg mx-auto">
      {/* Header Section */}
      <div className="flex flex-row items-center mb-6">
        <img
          src={imageProfile}
          className="w-16 h-16 object-cover rounded-full mr-4"
          alt="Profile"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{name}</h2>
          <h3 className="text-gray-500 text-sm">{date}</h3>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mb-6">
        {imageBefore ? (
          <img
            src={imageBefore}
            className="w-full h-auto rounded-lg"
            alt="Before Image"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        ) : (
          <p className="text-gray-500 text-sm">No image available</p>
        )}
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-2 gap-6 mb-6 text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <i className="w3-xlarge w3-margin-right">🌍</i>
          <span>{city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="w3-xlarge w3-margin-right">🏞️</i>
          <span>{tpa}</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="w3-xlarge w3-margin-right">📅</i>
          <span>{dateVolunteer}</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="w3-xlarge w3-margin-right">🤝</i>
          <span>{volunteer} Volunteers</span>
        </div>
      </div>

      {/* Title and Description */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 text-base mb-6">{description}</p>

      {/* Button Section */}
      {type !== "report" && (
        <div className="flex justify-center mt-auto">
          <button onClick={onVolunteerClick} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none transition duration-300">
            Volunteer
          </button>
        </div>
      )}
    </div>
  );
};

export default CardContent;
