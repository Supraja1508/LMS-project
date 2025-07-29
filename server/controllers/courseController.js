import Course from "../models/Course.js";


// ✅ Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .select("-enrolledStudents -courseContent") // hide heavy fields
      .populate({
        path: "educator",
        select: "name email imageUrl _id"
      });

    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Course by ID
export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id).populate({
      path: "educator",
      select: "name email imageUrl _id"
    });

    if (!courseData) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Convert to plain JS object for safe mutation
    const course = courseData.toObject();

    // Hide lectureUrl if not preview
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

