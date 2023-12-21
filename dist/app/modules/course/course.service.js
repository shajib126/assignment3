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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload, week) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create({
        title: payload.title,
        instructor: payload.instructor,
        categoryId: payload.categoryId,
        price: payload.price,
        tags: payload.tags,
        startDate: payload.startDate,
        endDate: payload.endDate,
        language: payload.language,
        provider: payload.provider,
        durationInWeeks: week,
        details: payload.details
    });
    return result;
});
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder, minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level } = query;
    const filter = {};
    if (minPrice !== undefined && maxPrice !== undefined) {
        filter.$and = [{ price: { $gt: parseFloat(minPrice), $lt: parseFloat(maxPrice) } }];
        //want range of prices that's why here i use $and it will check between minPrice and maxPrice 
    }
    if (tags !== undefined) {
        filter['tags.name'] = Array.isArray(tags) ? { $in: tags } : tags;
        //to check tags name and filter by the tags name if it's in tags field or not 
    }
    if (startDate !== undefined && endDate !== undefined) {
        //using $and to filtering range between startDate and endDate
        filter.$and = [{ startDate: { $gt: startDate }, endDate: { $lt: endDate } }];
    }
    if (language !== undefined) {
        filter.language = language;
    }
    if (provider !== undefined) {
        filter.provider = provider;
    }
    if (durationInWeeks !== undefined) {
        //parsing in integer because getting durationInWeeks query in string 
        filter.durationInWeeks = parseInt(durationInWeeks);
    }
    if (level !== undefined) {
        filter['details.level'] = level;
    }
    const sortData = {};
    const sortFields = ['title', 'price', 'startDate', 'endDate', 'language', 'durationInWeeks'];
    if (sortBy !== undefined && sortFields.includes(sortBy)) {
        sortData[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    const pageNumber = page ? parseInt(page) : 1;
    const size = limit ? parseInt(limit) : 10;
    const skip = (pageNumber - 1) * size;
    const result = yield course_model_1.Course.find(filter).sort(sortData).limit(size).skip(skip);
    return result;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { details, tags } = payload, courseRemainingData = __rest(payload, ["details", "tags"]);
    const updateNormal = yield course_model_1.Course.findByIdAndUpdate(id, courseRemainingData, {
        new: true,
        runValidators: true
    });
    if (!updateNormal) {
        throw new Error('error');
    }
    if (details === null || details === void 0 ? void 0 : details.level) {
        const updateLevel = yield course_model_1.Course.findByIdAndUpdate(id, { 'details.level': details.level }, { new: true, runValidators: true });
    }
    if (details === null || details === void 0 ? void 0 : details.description) {
        const updateDescription = yield course_model_1.Course.findByIdAndUpdate(id, { 'details.description': details.description }, { new: true, runValidators: true });
    }
    if (tags && tags.length > 0) {
        const deleteTags = tags.filter((el) => el.name && el.isDeleted).map((el) => el.name);
        const deleteTagsCourses = yield course_model_1.Course.findByIdAndUpdate(id, { $pull: {
                tags: { name: { $in: deleteTags } }
            } }, { new: true, runValidators: true });
        const newTags = tags === null || tags === void 0 ? void 0 : tags.filter((el) => el.name && !el.isDeleted);
        const newTagscourse = yield course_model_1.Course.findByIdAndUpdate(id, { $addToSet: { tags: { $each: newTags } } }, {
            new: true,
            runValidators: true
        });
    }
    return updateNormal;
});
const getCourseByIdReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find({ courseId: id }).select('-_id -updatedAt -createdAt -__v');
    const course = yield course_model_1.Course.findById({ _id: id });
    const final = { course, reviews };
    return final;
});
const getBestCoursesFromBD = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.aggregate([
        {
            $group: {
                _id: "$courseId",
                avarageRating: { $avg: "$rating" },
                totalReview: { $sum: 1 }
            }
        },
        {
            $sort: {
                avarageRating: -1,
                totalReview: -1
            }
        },
        {
            $limit: 1
        }
    ]);
    const maxRatingsReviewsCourse = result[0]._id;
    const course = yield course_model_1.Course.findById(maxRatingsReviewsCourse);
    const avarageRating = result[0].avarageRating;
    const reviewCount = result[0].totalReview;
    const final = { course, avarageRating, reviewCount };
    return final;
});
exports.CourseService = {
    createCourseIntoDB,
    updateCourseIntoDB,
    getAllCourseFromDB,
    getCourseByIdReviewFromDB,
    getBestCoursesFromBD
};
