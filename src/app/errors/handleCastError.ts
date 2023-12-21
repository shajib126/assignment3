import mongoose from "mongoose";
import {TGenericErrorResponse } from "../interface/error";


const handlecastErr = (err:mongoose.Error.CastError):TGenericErrorResponse=>{
    
    
    return {
        statusCode:400,
        success:false,
        message:'Ivalid ID',
        errorMessage:`${err?.value} is not a valid ID!`
    }
}

export default handlecastErr