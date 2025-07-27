import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const hero = () => {
  return (
    <div className='flex flex-col item-center justify-center w-full md:pt-7 pt-20
    px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>

      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>Shape your <span className='text-blue-600' >future</span> with courses tailored to<span className='text-blue-600'> your dreams and driven by your passion</span>
      <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' /></h1>
      
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
  Discover a world of knowledge, mentorship, and growth. Skillnest empowers you to learn on your terms — at your pace, for your dreams.
</p>

<p className='md:hidden text-gray-500 max-w-sm mx-auto'>We bring together world-class instructors, interactive content and a supportive community to help you achieve your Professional Goals.</p>

<SearchBar/>
    </div>
  )
}

export default hero
