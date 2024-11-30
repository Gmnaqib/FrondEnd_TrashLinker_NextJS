"use client"
import React, { useState } from 'react'

import '@/styles/globals.css';
import CardLeader from '@/components/CardLeader';

export default function page() {
  return (
    <div className="bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
      <CardLeader image='/logo.png' name='Dewa Tri Wijaya' point='100'></CardLeader>   
    </div>
  )
}
