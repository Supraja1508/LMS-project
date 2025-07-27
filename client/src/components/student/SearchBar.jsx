import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate()
const [input, setInput] = useState(data ? data :'')

const onSearchHandler = (e)=>{
  e.preventDefault()
  navigate('/course-list/' + input)
}

  return (
    <div className='w-full flex justify-center mt-10 md:mt-16'>
       <form
        onSubmit={onSearchHandler}
        className='w-full max-w-[500px] h-12 flex items-center bg-white border border-gray-300 rounded-full shadow-md focus-within:ring-2 focus-within:ring-blue-400 transition-all'
      >
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-2' />
        <input onChange={e => setInput(e.target.value)} value={input}
        type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80' />
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-full mr-2 transition-all'
        >Search</button>
      </form>
    </div>
  )
}

export default SearchBar
