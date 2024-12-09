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

const CardContent: React.FC<CardContent> = ({ imageProfile, name, date, title, description, imageBefore, imageAfter, city, tpa, dateVolunteer, volunteer }) => {
    return (
        <div className='relative flex flex-col bg-white text-black rounded-lg shadow-md p-4 m-3'>
            <div className='flex flex-row items-center'>
                <img src={imageProfile} className="w-16 h-16 object-cover rounded-full m-3"></img>

                <div className='flex flex-col'>
                    <h2>{name}</h2>
                    <h3>{date}</h3>
                </div>
            </div>

            <div className='flex flex-row'>
                <img src={imageBefore} className=""></img>
                <img src={imageAfter} className=""></img>
            </div>

            <div className='flex flex-row gap-3 items-center'>
                <div className='flex flex-row'>
                    <img src='icons/icon_location.svg' className="w-5 h-5"></img>
                    <h2>{city}</h2>
                </div>

                <div className='flex flex-row items-center'>
                    <img src='icons/icon_tpa.svg' className="w-8 h-8"></img>
                    <h2>{tpa}</h2>
                </div>

                <div className='flex flex-row'>
                    <img src='icons/icon_date.svg' className="w-5 h-5"></img>
                    <h2>{dateVolunteer}</h2>
                </div>

                <div className='flex flex-row'>
                    <img src='icons/icon_komunitas.svg' className="w-5 h-5"></img>
                    <h2>{volunteer}</h2>
                </div>

                <Button>Volunteer</Button>
            </div>

            
            <h1>{title}</h1>
            <h2>{description}</h2>


        </div>
    )
}

export default CardContent;
