import { Button } from '@nextui-org/button';
import React from 'react'

type CardContent = {
    imageProfile: string,
    name: string,
    date: string,
    title: string,
    description: string,
    imageBefore: string,
    imageAfter: string,
    city: string,
    tpa: string,
    dateVolunteer: string,
    volunteer: number
};

const CardContent: React.FC<CardContent> = ({
    imageProfile,
    name,
    date,
    title,
    description,
    imageBefore,
    imageAfter,
    city,
    tpa,
    dateVolunteer,
    volunteer,
  }) => {
    return (
      <div className="relative flex flex-col bg-white text-black rounded-lg shadow-md p-4 m-3 max-w-full md:max-w-md lg:max-w-lg">
        {/* Header Section */}
        <div className="flex flex-row items-center mb-4">
          <img
            src={imageProfile}
            className="w-14 h-14 object-cover rounded-full mr-3"
            alt="Profile"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{name}</h2>
            <h3 className="text-gray-500">{date}</h3>
          </div>
        </div>
  
        {/* Image Section */}
        <div className="flex justify-center mb-4">
          <img
            src={imageBefore}
            className="w-full h-auto rounded-md"
            alt="Before Image"
          />
        </div>
  
        {/* Information Section */}
        <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-4">
          <div className="flex items-center">
            <img src="icons/icon_location.svg" className="w-5 h-5 mr-1" alt="Location Icon" />
            <h2 className="text-sm">{city}</h2>
          </div>
  
          <div className="flex items-center">
            <img src="icons/icon_tpa.svg" className="w-5 h-5 mr-1" alt="TPA Icon" />
            <h2 className="text-sm">{tpa}</h2>
          </div>
  
          <div className="flex items-center">
            <img src="icons/icon_date.svg" className="w-5 h-5 mr-1" alt="Date Icon" />
            <h2 className="text-sm">{dateVolunteer}</h2>
          </div>
  
          <div className="flex items-center">
            <img src="icons/icon_komunitas.svg" className="w-5 h-5 mr-1" alt="Volunteer Icon" />
            <h2 className="text-sm">{volunteer}</h2>
          </div>
        </div>
  
        {/* Title and Description */}
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
  
        {/* Button Section */}
        <div className="flex justify-center mt-auto">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Volunteer
          </button>
        </div>
      </div>
    );
  };

export default CardContent;
