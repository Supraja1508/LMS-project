import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div className="md:w-64 w-15 min-h-screen bg-gradient-to-b from-blue-900 via-white to-sky-400 text-gray-800 shadow-md flex flex-col py-4 transition-all duration-300 ease-in-out ">

      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center gap-3 py-3 px-4 md:px-6 text-sm font-medium 
            hover:bg-white/30 transition rounded-l-full mx-2
            ${isActive
              ? 'bg-white/40 border-l-4 border-blue-700 text-blue-900 shadow-md'
              : 'text-gray-800'}`
          }
        >
          <img src={item.icon} alt={item.name} className="w-5 h-5" />
          <span className="md:inline hidden">{item.name}</span>
        </NavLink>
      ))}

    </div>
  );
}

export default Sidebar
