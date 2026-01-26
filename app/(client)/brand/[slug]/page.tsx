'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const Brands = () => {
    const params=useParams()
    console.log(params.slug);
    
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  )
}

export default Brands