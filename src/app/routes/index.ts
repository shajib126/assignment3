import { Router } from "express";
import { CourseRouter } from "../modules/course/course.router";
import { CategoryRouter } from "../modules/category/category.router";
import { ReviewRouter } from "../modules/review/review.router";
const router = Router()

const moduleRoutes = [
    {
        path:'/',
        route:CourseRouter
    },
    {
        path:'/categories',
        route:CategoryRouter
    },
    {
        path:'/reviews',
        route:ReviewRouter
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router