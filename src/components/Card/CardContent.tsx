import React from "react";
import { Calendar, Globe, Trash2, Users } from "lucide-react";

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

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="relative flex flex-col bg-white text-black rounded-2xl shadow-md p-5 max-w-md mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={imageProfile}
          className="w-12 h-12 object-cover rounded-full mr-3"
          alt="Profile"
        />
        <div>
          <h2 className="text-lg font-medium">{name}</h2>
          <h3 className="text-gray-400 text-xs">{date}</h3>
        </div>
      </div>

      {/* Image */}
      {imageBefore ? (
        <img
          src={imageBefore}
          className="w-full h-auto rounded-lg mb-4"
          alt="Before Image"
          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
        />
      ) : (
        <div className="flex justify-center items-center bg-gray-100 rounded-lg h-40 mb-4">
          <Trash2 className="text-gray-300 w-10 h-10" />
        </div>
      )}

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Globe size={20} strokeWidth={1.5} />
          <span>{city}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Trash2 size={20} strokeWidth={1.5} />
          <span>{tpa}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={20} strokeWidth={1.5} />
          <span>{formatDate(dateVolunteer)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={20} strokeWidth={1.5} />
          <span>{volunteer} Volunteers</span>
        </div>
      </div>

      {/* Title & Description */}
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-4">{description}</p>

      {/* Button */}
      {type !== "report" && (
        <button
          onClick={onVolunteerClick}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full text-center"
        >
          Volunteer
        </button>
      )}
    </div>
  );
};

export default CardContent;
