import React from "react";

interface FeatureCardProps {
  fitur: string;
  description: string;
  icon: string
}

const CardFeature: React.FC<FeatureCardProps> = ({ fitur, description, icon }) => {
  return (
    <article className="flex flex-col items-center overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white p-4 sm:p-6 h-60">
      {/* Icon */}
      <div className="flex justify-center items-center">
        <img src={`/icons/${icon}`} alt="My Icon" className="w-10 h-10" />
      </div>

      {/* Title */}
      <div className="flex justify-center items-center mt-4">
        <h3 className="text-lg text-center font-bold text-gray-900 sm:text-xl">
          {fitur}
        </h3>
      </div>

      {/* Description */}
      <div className="flex justify-center items-center mt-2">
        <p className="text-sm text-gray-500 text-center">{description}</p>
      </div>
    </article>

  );
};

export default CardFeature;
