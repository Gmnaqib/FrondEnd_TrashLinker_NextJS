import React from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';

export default function Login() {
  return (
    <div className="bg-customBlue p-10 space-y-5" >

      <h1 className=' items-center text-center text-white text-6xl p-5'>Login Aktor Bebas Sampah</h1>

      <Input type="email" label="Email" placeholder="Enter your email" />
      <Input type="password" label="Password" placeholder="Enter your password" />

      <div className='flex flex-col items-center'>
        <Button color='success' className='w-20'>Login</Button>
        <Link href={"/register"} className='text-blue-500 text-white'>Silahkan Register Apabila Tidak Mempunyai Akun!</Link>
      </div>
    </div>
  )
}
