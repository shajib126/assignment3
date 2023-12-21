import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidations } from './course.validation'
import { CourseController } from './course.controller'
const router = express.Router()

router.post('/course',validateRequest(CourseValidations.createCourseValidationSchema),CourseController.createCourse)
router.put('/courses/:courseId',validateRequest(CourseValidations.updateCourseValidationSchema),CourseController.updateCourse)
router.get('/courses',CourseController.getAllCourse)
router.get('/courses/:courseId/reviews',CourseController.getCourseIdByReview)
router.get('/course/best',CourseController.getBestCourse)
export const CourseRouter =router