import { Request,Response } from "express";
import { CourseService } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
const createCourse =async (req:Request,res:Response) => {
    
   
   
    
    // console.log(req.body);
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    const differenceTime = endDate.getTime() - startDate.getTime()   
    const week = Math.ceil(differenceTime / (1000 * 60 * 60 * 24 * 7))
    
    const result = await CourseService.createCourseIntoDB(req.body,week)
    sendResponse(res,{
        success:true,
        statusCode:201,
        message:'Course createed successfully',
        data:result
    })
}
const getAllCourse = catchAsync(async(req:Request,res:Response)=>{
    const result = await CourseService.getAllCourseFromDB(req.query)
    if(result.length<1){
        res.status(404).json({
            success:false,
            message:'Course not found'
        })
    }else{
        sendResponse(res,{
            success:true,
            statusCode:200,
            message:'Courses retrieved successfully',
            meta:{
                page:req.query.page,
                limit:req.query.limit,
                total:result.length
            },
            data:result
        })
    }
  
    
    
   
    
    
})

const updateCourse = catchAsync(async(req:Request,res:Response)=>{
    const {courseId} = req.params
    const result = await CourseService.updateCourseIntoDB(courseId,req.body)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'Course updated successfully',
        data:result
    })
})

const getCourseIdByReview = catchAsync(async(req:Request,res:Response)=>{
    const {courseId} = req.params
    const result = await CourseService.getCourseByIdReviewFromDB(courseId)
    if(!result.course){
        res.status(404).json({
            success:false,
            message:'Course not found by this id'
        })
        
    }else{
        sendResponse(res,{
            success:true,
            statusCode:200,
            message:'Course and Reviews retrieved successfully',
            data:result
        })
    }
 
    
    
})
const getBestCourse = catchAsync(async(req:Request,res:Response)=>{
    
    const result = await CourseService.getBestCoursesFromBD()
    
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'Best course retrieved successfully',
        data:result
    })
})



export const CourseController = {
    createCourse,
    updateCourse,
    getAllCourse,
    getCourseIdByReview,
    getBestCourse

}

