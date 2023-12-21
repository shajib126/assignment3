"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/course', (0, validateRequest_1.default)(course_validation_1.CourseValidations.createCourseValidationSchema), course_controller_1.CourseController.createCourse);
router.put('/courses/:courseId', (0, validateRequest_1.default)(course_validation_1.CourseValidations.updateCourseValidationSchema), course_controller_1.CourseController.updateCourse);
router.get('/courses', course_controller_1.CourseController.getAllCourse);
router.get('/courses/:courseId/reviews', course_controller_1.CourseController.getCourseIdByReview);
router.get('/course/best', course_controller_1.CourseController.getBestCourse);
exports.CourseRouter = router;
