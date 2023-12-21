import { Request,Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { CategoryServices } from "./category.service"
import sendResponse from "../../utils/sendResponse"

//category controller
const createCategory =catchAsync(async (req:Request,res:Response) => {
    const result = await CategoryServices.createCategoryIntoDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:201,
        message:'Category created successfully',
        data:result
    })
})

const allCategory = catchAsync(async(req:Request,res:Response)=>{
    const result = await CategoryServices.allCategoriesFromDB()
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'Category retrieved successfully',
        data:result
    })
})


export const CategoryControllers = {
    createCategory,
    allCategory
}