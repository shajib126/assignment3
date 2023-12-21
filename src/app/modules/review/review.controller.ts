import {Request,Response}  from 'express'
import catchAsync from '../../utils/catchAsync'
import { ReviewServies } from './review.service'
import sendResponse from '../../utils/sendResponse'

const createReview = catchAsync(async(req:Request,res:Response)=>{
    const result = await ReviewServies.createReviewIntoDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:201,
        message:'Review created successfully',
        data:result
    })
   
    
})


export const ReviewControllers = {
    createReview
}