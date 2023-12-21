import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";

const handleZodError = (err:ZodError):TGenericErrorResponse =>{
    const errorMess = JSON.parse(err.message)
    //getting error from zod validation middleware 
    return {
        statusCode:400,
        success:false,
        message:'Validation Error',
        errorMessage:errorMess.map((err:any)=>err.message).join('. '),
    }
}

export default handleZodError