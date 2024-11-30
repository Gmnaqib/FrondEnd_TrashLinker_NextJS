"use client"
import React, { useState } from 'react'

import '@/styles/globals.css';
import CardLeader from '@/components/CardLeader';

export default function page() {
  return (
    <div>
      <h2 className=' text-black'>LeaderBoard</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
        <CardLeader imageUrl='img/ronaldo.jpg' name='Dewa Tri Wijaya' points={100} rank={1}></CardLeader>
        <CardLeader imageUrl='img/ronaldo.jpg' name='Dewa Tri Wijaya' points={100} rank={1}></CardLeader>
        <CardLeader imageUrl='img/ronaldo.jpg' name='Dewa Tri Wijaya' points={100} rank={1}></CardLeader>
        <CardLeader imageUrl='img/ronaldo.jpg' name='Dewa Tri Wijaya' points={100} rank={1}></CardLeader>
      </div>
    </div>

  )
}
