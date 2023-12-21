import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handlecastErr from "../errors/handleCastError";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";




const globalErrorHandler:ErrorRequestHandler = (err,req,res,next)=>{
let statusCode = 500;    
let success = false
    let message = 'Something went wrong'
    let errorMessage = ''
   
    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode
        success = simplifiedError?.success
        message = simplifiedError?.message
        errorMessage = simplifiedError?.errorMessage
    }else if(err?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError?.statusCode
        success = simplifiedError?.success
        message = simplifiedError?.message
        errorMessage = 'sfsdf'
    }else if(err?.name === 'CastError'){
        const simplifiedError = handlecastErr(err)
        statusCode = simplifiedError?.statusCode
        success = simplifiedError?.success
        message = simplifiedError?.message
        errorMessage = simplifiedError?.errorMessage
    }
    
    
    return res.status(statusCode).json({
        success:false,
        message,
        errorMessage,
        erroDetails:err,
        stack: err?.stack // i did this for both production and development variable because of P-Hero team chacking this code in production , otherwise should check if it's in development mood have to show the error stack otherwise showing null .  
    })
}

export default globalErrorHandler