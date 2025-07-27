import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-400 via-blue-100 to-blue-900 text-white w-full mt-auto shadow-inner p-3 ">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">

        {/* Logo and Copyright */}
        <div className="flex items-center gap-4">
          <img src={assets.logo} alt="SkillNest Logo" className="h-6 md:h-8 " />
          <div className="hidden md:block h-6 w-px bg-white/50"></div>
          <p className="text-xs md:text-sm text-white">
            © 2025 SkillNest. All Rights Reserved.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noreferrer">
            <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
