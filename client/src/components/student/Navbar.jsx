import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'


const Navbar = () => {

  const {navigate, isEducator} = useContext(AppContext)

  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk()
  const { user } = useUser()

  return (
    <div className={`w-full border-b border-gray-300 py-2 px-4 sm:px-6 md:px-10 lg:px-14
      flex items-center justify-between z-50 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}
    `}>
      
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Skillnest Logo"
        className="w-12 lg:w-25 cursor-pointer"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
        {user && (
          <>
            <button onClick={() => navigate('/educator')}>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            <span className="text-gray-400">|</span>
            <Link to="/my-enrollments">My Enrollments</Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm"
          >
            Create Account
          </button>
        )}
      </div>
     {/* For phone Screen */}
<div className='md:hidden flex items-center justify-between w-full text-gray-500 px-2'>
  <div className='flex flex-col gap-1 text-xs'>
    {user && (
      <>
        <button
          onClick={() => navigate('/educator')}
          className='whitespace-nowrap'
        >
          {isEducator ? 'Educator Dashboard' : 'Become Educator'}
        </button>
        <Link to='/my-enrollments' className='whitespace-nowrap'>
          My Enrollments
        </Link>
      </>
    )}
  </div>

  {user ? (
    <UserButton />
  ) : (
    <button onClick={() => openSignIn()}>
      <img src={assets.user_icon} alt='User' className='w-6 h-6' />
    </button>
  )}
</div>
</div>
  )
}

export default Navbar
