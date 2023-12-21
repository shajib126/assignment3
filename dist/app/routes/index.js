"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_router_1 = require("../modules/course/course.router");
const category_router_1 = require("../modules/category/category.router");
const review_router_1 = require("../modules/review/review.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/',
        route: course_router_1.CourseRouter
    },
    {
        path: '/categories',
        route: category_router_1.CategoryRouter
    },
    {
        path: '/reviews',
        route: review_router_1.ReviewRouter
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
