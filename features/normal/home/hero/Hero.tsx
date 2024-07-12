import { Button } from '@/components/ui/button'
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col justify-center px-5 py-12 bg-gradient-to-r from-purple-400 to-purple-600 md:py-20'>
      <h2 className='text-2xl font-bold text-white text-center lg:text-3xl'>Welcome to Battle App</h2>
      <p className='text-md text-white text-center mt-1 lg:text-lg'>Test Your Knowledge, Challenge Your Friends!</p>
      <Button className='mt-5 max-w-xs mx-auto'>Get Started</Button>
    </div>
  )
}

export default Hero
