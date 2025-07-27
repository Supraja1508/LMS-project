import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <header className="bg-gradient-to-r from-white via-blue-300 to-blue-900 text-white shadow-md  border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">

        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-12 md:w-14" />
        </Link>

        {/* Greeting & Profile Icon */}
        <div className="flex items-center gap-4 text-sm md:text-base">
          <p className="hidden sm:block">Hi! {user ? user.fullName : 'Developer'}</p>
          {user ? (
            <UserButton />
          ) : (
            <img className="w-8 h-8 rounded-full" src={assets.profile_img} alt="profile" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
