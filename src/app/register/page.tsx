'use client';
import React from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { DateInput } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { CalendarDate } from "@internationalized/date";


export default function Register() {
  const animals = [
    { key: 1, label: 'Masyarakat' },
    { key: 2, label: 'Komunitas' },
    { key: 3, label: 'Petugas' },
  ];

  return (
    <div className="bg-customBlue p-20 space-y-5 rounded-lg shadow-lg" >

      <h1 className=' items-center text-center text-white text-4xl p-5'>Register Aktor Bebas Sampah</h1>

      <Input type="username" label="Username" placeholder="Enter your username" />
      <Input type="email" label="Email" placeholder="Enter your email" />
      <DateInput label={"Birth date"} placeholderValue={new CalendarDate(1995, 11, 6)} className="max-w-sm" />
      <Input type="kota" label="Kota" placeholder="Enter your kota" />
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      <Input type="alamat" label="Alamat Lengkap" placeholder="Enter your Alamat Lengkap" />

      <Input type="password" label="Password" placeholder="Enter your password" />
      <Input type="password" label="Konfirmasi Password" placeholder="Enter your konfirmasi password" />

      <div className='flex flex-col items-center'>
        <Button color='success' className='w-80 text-white'>Register</Button>
        <Link href={"/login"} className='text-blue-500 text-center'>Silahkan Login Apabila Sudah Mempunyai Akun!</Link>
      </div>
    </div>
  )
}