import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, [allCourses]);

  return courses ? (
    <div className="min-h-screen flex flex-col md:p-10 p-6 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-2xl font-semibold text-gray-800 pb-6">My Courses</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300 max-w-6xl w-full mx-auto">
        <table className="table-auto w-full">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Course</th>
              <th className="px-6 py-4 text-left font-medium">Earnings</th>
              <th className="px-6 py-4 text-left font-medium">Students</th>
              <th className="px-6 py-4 text-left font-medium">Published On</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.courseThumbnail || 'https://placehold.co/80x80?text=Course'}
                      alt={course.courseTitle}
                      className="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm"
                      loading="lazy"
                    />
                    <span className="font-medium text-gray-700 line-clamp-2 max-w-xs">
                      {course.courseTitle || 'Untitled Course'}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {currency}
                  {Math.floor(
                    course.enrolledStudents.length *
                      (course.coursePrice -
                        (course.discount * course.coursePrice) / 100)
                  )}
                </td>

                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {course.enrolledStudents.length}
                </td>

                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {new Date(course.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
