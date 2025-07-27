import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-start md:p-8 p-4 pt-8 bg-gradient-to-br from-blue-50 to-white'>
      <div className='w-full max-w-5xl mx-auto overflow-hidden rounded-md bg-white border border-gray-300 shadow-md'>

        <h2 className='text-lg font-semibold text-gray-800 px-6 pt-6 pb-4'>All Enrolled Students</h2>

        <table className='w-full table-auto text-sm'>
          <thead className="bg-blue-100 text-gray-900 border-b border-blue-300">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell w-12">#</th>
              <th className="px-4 py-3 font-semibold text-left">Student Name</th>
              <th className="px-4 py-3 font-semibold text-left">Course Title</th>
              <th className="px-4 py-3 font-semibold text-left">Date</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.student.imageUrl}
                    alt="Student"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className='px-4 py-3 hidden sm:table-cell'> {new Date(item.
                 purchaseDate).toLocaleDateString()} </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  ) : <Loading />;
};

export default StudentsEnrolled;
