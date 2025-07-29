import { clerkClient } from '@clerk/express';
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js'; // ✅ You forgot to import this

// ✅ Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = await req.auth(); // Clerk Auth fix

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    res.json({ success: true, message: 'You can publish a course now' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add New Course
export const addCourse = async (req, res) => {
  try {
    const { userId } = await req.auth(); // Clerk Auth fix
    const { courseData } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: 'Thumbnail Not Attached' });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = userId;

    // Ensure isPublished is boolean (in case it comes as string)
    parsedCourseData.isPublished = parsedCourseData.isPublished === true || parsedCourseData.isPublished === 'true';

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'lms/thumbnails',
    });

    parsedCourseData.courseThumbnail = imageUpload.secure_url;

    const newCourse = await Course.create(parsedCourseData);

    res.json({ success: true, message: 'Course Added Successfully', course: newCourse });
  } catch (error) {
    console.error('Add Course Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all courses of educator
export const getEducatorCourses = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const courses = await Course.find({ educator: userId });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Educator Dashboard Data
export const educatorDashboardData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const courses = await Course.find({ educator: userId });
    const totalCourses = courses.length;

    const courseIds = courses.map(course => course._id);

    // Get completed purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    });

    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    // collect unique enrolled student info
    const enrolledStudentsData = [];

    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        'name imageUrl'
      );

      students.forEach(student => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Enrolled Students with Purchase Details
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const courses = await Course.find({ educator: userId });
    const courseIds = courses.map(course => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })
      .populate('userId', 'name imageUrl')
      .populate('courseId', 'courseTitle');

    const enrolledStudents = purchases.map(purchase => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

