import React from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';

export default function Login() {
  return (
    <div className="bg-customBlue p-20 space-y-5 rounded-lg shadow-lg" >

      <h1 className=' items-center text-center text-white text-4xl p-5'>Login Aktor Bebas Sampah</h1>

      <Input type="email" label="Email" placeholder="Enter your email" />
      <Input type="password" label="Password" placeholder="Enter your password" />

      <div className='flex flex-col items-center'>
        <Button color='success' className='w-80 text-white'>Login</Button>
        <Link href={"/register"} className='text-blue-500 text-center'>Silahkan Register Apabila Tidak Mempunyai Akun!</Link>
      </div>
    </div>
  )
}
