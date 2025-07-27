import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className='min-h-screen flex flex-col gap-8 md:p-10 p-6 bg-gradient-to-br from-blue-50 to-white'>

      {/* Dashboard Title */}
      <h1 className="text-2xl font-semibold text-gray-800">Educator Dashboard</h1>

      {/* Cards Section */}
      <div className='flex flex-wrap gap-6'>

        {/* Total Enrollments */}
        <div className='flex items-center gap-4 shadow-lg border border-blue-400 bg-white p-5 w-64 rounded-lg'>
          <img src={assets.patients_icon} alt="enroll_icon" className='w-10 h-10' />
          <div>
            <p className='text-2xl font-bold text-gray-700'>
              {dashboardData.enrolledStudentsData.length}
            </p>
            <p className='text-sm text-gray-500'>Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className='flex items-center gap-4 shadow-lg border border-blue-400 bg-white p-5 w-64 rounded-lg'>
          <img src={assets.appointments_icon} alt="course_icon" className='w-10 h-10' />
          <div>
            <p className='text-2xl font-bold text-gray-700'>
              {dashboardData.totalCourses}
            </p>
            <p className='text-sm text-gray-500'>Total Courses</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className='flex items-center gap-4 shadow-lg border border-blue-400 bg-white p-5 w-64 rounded-lg'>
          <img src={assets.earning_icon} alt="earning_icon" className='w-10 h-10' />
          <div>
            <p className='text-2xl font-bold text-gray-700'>
              {currency}{dashboardData.totalEarnings}
            </p>
            <p className='text-sm text-gray-500'>Total Earnings</p>
          </div>
        </div>

      </div>

      {/* Latest Enrollments Table */}
<div className="w-full">
  <h2 className="pb-4 text-3xl font-bold text-pink-600">Latest Enrollments</h2>

  <div className="max-w-4xl w-full overflow-x-auto rounded-lg bg-white border border-blue-400 shadow-md">
    <table className="min-w-full text-sm">
      <thead className="bg-blue-100 text-gray-900 border-b border-blue-300">
        <tr>
          <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell w-12">#</th>
          <th className="px-4 py-3 font-semibold text-left">Student Name</th>
          <th className="px-4 py-3 font-semibold text-left">Course Title</th>
        </tr>
      </thead>

      <tbody className="text-gray-700">
        {dashboardData.enrolledStudentsData.map((item, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition">
            <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>

            <td className="px-4 py-3 flex items-center gap-3 max-w-[220px]">
              <img
                src={item.student.imageUrl}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
              />
              <span className="truncate">{item.student.name}</span>
            </td>

            <td className="px-4 py-3 max-w-xs truncate">{item.courseTitle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



    </div>
  ) : <Loading />;
};

export default Dashboard;
