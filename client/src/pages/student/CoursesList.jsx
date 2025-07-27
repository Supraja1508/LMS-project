import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(()=> {
    if(allCourses && allCourses.length > 0 ){
      const tempCourses =allCourses.slice()

      input ? 
         setFilteredCourse(
          tempCourses.filter(
            item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
          ))
          : setFilteredCourse(tempCourses)
    }

  }, [allCourses, input])

  return (
    <>
      <div className='relative md:px-36 px-6 pt-16 text-left'>
        <div className='flex flex-col md:flex-row md:items-center justify-between w-full mb-8 md:mb-12'>
          
          {/* Title + Breadcrumb */}
          <div className='mb-4 md:mb-0'>
            <h1 className='text-[22px] md:text-[26px] font-semibold text-gray-900 leading-tight'>
              Course List
            </h1>
            <p className='text-gray-500 text-sm font-medium mt-1'>
              <span 
                className='text-blue-600 cursor-pointer hover:underline' 
                onClick={() => navigate('/')}>
                Home
              </span> / <span>Course List</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className='w-full md:w-auto'>
            <SearchBar data={input} />
          </div>
        </div>
        {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-700'>
            <p>{input}</p>
            <img src={assets.cross_icon} alt="" className='cursor-pointer hover:' onClick={()=>
              navigate('/course-list')
            } />
          </div>
        }

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0'>
          {filteredCourse.map((course, index) => <CourseCard key={index} course={course} />)}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CoursesList
