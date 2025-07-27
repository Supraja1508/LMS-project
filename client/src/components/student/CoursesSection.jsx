import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'  // Make sure to import context

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext)

  return (
    <div className='py-10 px-5 md:px-36 lg:px-44 bg-white'>
      <h2 className='text-3xl font-bold text-skillnest-darktext mb-3'>Learn from the Best</h2>
      
      <p className='text-sm md:text-base text-gray-600 mt-3 mb-7'>
        Explore a wide range of expert-led courses crafted to unlock your potential. Whether you're diving into tech, design, or business, 
        <span className='font-semibold text-skillnest-secondary'> Skillnest</span> <br/>offers practical learning experiences tailored to your goals — empowering you to grow at your pace, on your path.
      </p>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
        {allCourses?.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <div className='flex justify-center'>
        <Link
          to={'/course-list'}
          onClick={() => scrollTo(0, 0)}
          className='text-skillnest-primary border border-blue-400 px-6 py-2 rounded-full hover:bg-blue-900 hover:text-gray-300 transition'
        >
          Show all Courses
        </Link>
      </div>
    </div>
  )
}

export default CoursesSection
