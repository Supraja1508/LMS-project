import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import  Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {

const {id} = useParams()
const [courseData, setCourseData] = useState(null)
const [openSections, setOpenSections] = useState({})
const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
const [playerData, setPlayerData] = useState(null)

const {allCourses, calculateRating, calculateNoOfLectures, 
  calculateCourseDuration, calculateChapterTime, currency} = useContext(AppContext)

const fetchCourseData = async ()=> {
  const findCourse = allCourses.find(course => course._id === id)
  setCourseData(findCourse);
}

useEffect(()=>{
  fetchCourseData() 
},[allCourses])

const toggleSection = (index) => {
  setOpenSections((prev) => (
    {...prev,
      [index]: !prev[index]
    }));
};


  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between
    md:px-36 px-8 md:pt-30 pt-29 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'>
      </div>
     

     {/* left column */}
     <div className='mt-10 max-w-xl z-10 text-gray-600'>
      <h1 className='md:text-course-details-heading-large font-size
      text-course-deatails-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
      <p className='pt-4 md:text-base text-sm' 
      dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p>
     
{/* review and ratings */}
<div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i)=>(
            <img key={i} src={i < Math.floor (calculateRating(courseData)) ? assets.star : assets.star_blank} alt=''  
            className='w-3.5 h-3.5'/>
          ))}
          </div>
          <p className='text-gray-500'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
        
        <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
        </div>

        <p className='text-sm'>Course by <span className='text-blue-700 underline'>SkillNest</span></p>
       
       {/* Course Structure */}

<div className='pt-8 text-gray-900'>
  <h2 className='text-xl font-semibold'>Course Structure</h2>

  <div className='pt-5'>
    {courseData.courseContent.map((chapter, index)=> (
      <div key={index} className='border border-gray-400 bg-white mb-2 
      rounded'>
        <div className='flex items-center justify-between px-4 py-3 
        cursor-pointer select-none' onClick={()=> toggleSection(index)}>
          <div className='flex items-end gap-2'>
            <img
  className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''} pt-1 pb-2`}
  src={assets.down_arrow_icon}
  alt="arrow icon"
/>

            <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
          </div>
          <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - 
            {calculateChapterTime(chapter)}
          </p>
        </div>


       { /*Lecture List*/}

<div className={`overflow-hidden transition-all duration-300 
${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600
  border-t border-gray-300'>
    {chapter.chapterContent.map((lecture, i)=> (
      <li key={i} className='flex items-start gap-2 py-1'>
        <img src={assets.play_icon} alt="play icon" className='w-4 
        h-4' />
        <div className='flex items-center justify-between w-full
        text-gray-900 text-xs md:text-default'>
          <p>{lecture.lectureTitle}</p>
          <div className='flex gap-2'>
            {lecture.isPreviewFree && <p 
            onClick={()=> setPlayerData({
              videoId: lecture.lectureUrl.split('/').pop()
            })}
            className='text-blue-500 cursor-pointer'>Preview</p>}
            <p>
              {humanizeDuration(lecture.lectureDuration * 60 * 
                1000, {units: ['h', 'm']})}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

      </div>
    ))}
  </div>
</div>

<div className='py-20 text-sm md:text-default'>
  <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
  <p className='pt-3 rich-text' 
      dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>
</div>


     </div>
     
     
   {/* right column */}
<div className="max-w-sm z-10 shadow-custom-card rounded-lg overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] mt-10">
  
 {
  playerData ?
         <YouTube videoId={playerData.videoId} opts={{playerVars: {
          autoplay: 1}}} iframeClassName='w-full aspect-video' />
        :  <img
    src={courseData.courseThumbnail}
    alt="Course Thumbnail"
    className="w-full h-48 object-cover"
  />
 }
 
 
  
{/* Offer & Pricing Section */}
  <div className="p-4">
    {/* Offer Message */}
    <div className="flex items-center gap-2 text-sm text-red-500 mb-2">
       <img className="w-4 h-4" src={assets.time_left_clock_icon}
        alt="Time left icon"/>
      <p>
        <span className="font-semibold">5 Days</span> left at this Price!
      </p>
    </div>

    {/* Price Row */}
    <div className="flex gap-3 items-baseline">
      <p className="text-2xl md:text-3xl font-bold text-gray-900">
        {currency}
        {(courseData.coursePrice -
          (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
      </p>
      <p className="line-through text-gray-500 text-base">
        {currency}
        {courseData.coursePrice}
      </p>
      <p className="text-base text-gray-500">{courseData.discount}% off</p>
    </div>

    <div className='flex items-center text-sm md:text-default gap-4 pt-2 
      md:pt-4 text-gray-500'>
        
        <div className='flex items-center gap-1'>
          <img src={assets.star} alt="star icon" />
          <p>{calculateRating(courseData)}</p>
        </div>

        <div className='h-4 w-px bg-gray-500/40'></div>

        <div className='flex items-center gap-1'>
          <img src={assets.time_clock_icon} alt="clock icon" />
          <p>{calculateCourseDuration(courseData)}</p>
        </div>

        <div className='h-4 w-px bg-gray-500/40'></div>

        <div className='flex items-center gap-1'>
          <img src={assets.lesson_icon} alt="lesson icon" />
          <p>{calculateNoOfLectures(courseData)} lessons</p>
        </div>
        </div>

        <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600
        text-white font-medium'>
          {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
        </button>

        <div className="mt-8 space-y-3 text-gray-700">
  <h2 className="text-xl font-semibold text-gray-900">What's in the course?</h2>
  <ul className="list-disc list-inside text-sm md:text-base leading-relaxed">
    <li>{calculateNoOfLectures(courseData)} in-depth video lessons</li>
    <li>{calculateCourseDuration(courseData)} total duration</li>
    <li>Expert instruction by industry professionals</li>
    <li>Interactive chapter-wise breakdown</li>
    <li>Downloadable resources and quizzes</li>
    <li>Lifetime access and mobile-friendly</li>
    <li>Certificate of completion</li>
  </ul>
</div>
</div>
</div>
</div>

<Footer />

    </>
  ) : <Loading />
}

export default CourseDetails
