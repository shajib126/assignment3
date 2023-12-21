"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const course_service_1 = require("./course.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const differenceTime = endDate.getTime() - startDate.getTime();
    const week = Math.ceil(differenceTime / (1000 * 60 * 60 * 24 * 7));
    const result = yield course_service_1.CourseService.createCourseIntoDB(req.body, week);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Course createed successfully',
        data: result
    });
});
const getAllCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseService.getAllCourseFromDB(req.query);
    if (result.length < 1) {
        res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Courses retrieved successfully',
            meta: {
                page: req.query.page,
                limit: req.query.limit,
                total: result.length
            },
            data: result
        });
    }
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.CourseService.updateCourseIntoDB(courseId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Course updated successfully',
        data: result
    });
}));
const getCourseIdByReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.CourseService.getCourseByIdReviewFromDB(courseId);
    if (!result.course) {
        res.status(404).json({
            success: false,
            message: 'Course not found by this id'
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Course and Reviews retrieved successfully',
            data: result
        });
    }
}));
const getBestCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseService.getBestCoursesFromBD();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Best course retrieved successfully',
        data: result
    });
}));
exports.CourseController = {
    createCourse,
    updateCourse,
    getAllCourse,
    getCourseIdByReview,
    getBestCourse
};
