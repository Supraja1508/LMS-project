// routes/courseRouter.js
import express from 'express';
import { getAllCourses, getCourseId } from '../controllers/courseController.js';

const courseRouter = express.Router();

courseRouter.get('/all', getAllCourses);    // ✅ Get all courses (with educator details)
courseRouter.get('/:id', getCourseId);      // ✅ Get course by ID (make sure controller uses populate too)

export default courseRouter;
