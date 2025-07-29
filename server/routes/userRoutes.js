import express from 'express';
import { getUserData, purchaseCourse, userEnrolledCourses } from '../controllers/userController.js';
import { protectUser } from '../middlewares/authMiddleware.js'; // ✅ this must match your middleware

const router = express.Router();

router.get('/me', protectUser, getUserData);
router.get('/enrolled-courses', protectUser, userEnrolledCourses);
router.post('/purchase', purchaseCourse);

export default router;
