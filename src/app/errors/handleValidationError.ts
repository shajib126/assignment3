import mongoose from "mongoose";

import {  TGenericErrorResponse } from "../interface/error";

//handle validation error
const handleValidationError = (
    err: mongoose.Error.ValidationError,
  ): TGenericErrorResponse => {
  
  //getting validation error
    
  
    return {
      statusCode:400,
      success:false,
      message: 'Validation Error',
      errorMessage:''
    };
  };
  

export default handleValidationError