import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-16 sm:w-15 aspect-square border-3
       border-gray-400 border-t-4 border-t-blue-400 rounded-full
       animate-spin'></div>
    </div>
  )
}

export default Loading
