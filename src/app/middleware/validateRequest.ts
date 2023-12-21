import {Request,Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

//check and validate schema
const validateRequest = (schema:AnyZodObject)=>{
    //getting schema as parameter
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            await schema.parseAsync({
                body:req.body //parse schema
            })
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default validateRequest