import React from 'react'

interface LeaderCardProps {
    image: string;
    name: string;
    point: string
}

const CardLeader: React.FC<LeaderCardProps> = ({ image, name, point }) => {
    return (
        <article className="flex flex-col items-center overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white p-4 sm:p-6 h-60">
            {/* Icon */}
            <div className="flex justify-center items-center">
                <img src={`/icons/${image}`} alt="My Icon" className="w-10 h-10" />
            </div>

            {/* Title */}
            <div className="flex justify-center items-center mt-4">
                <h3 className="text-lg text-center font-bold text-gray-900 sm:text-xl">
                    {name}
                </h3>
            </div>

            {/* Description */}
            <div className="flex justify-center items-center mt-2">
                <p className="text-sm text-gray-500 text-center">{point}</p>
            </div>
        </article>
    )
};

export default CardLeader;