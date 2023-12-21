"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorMess = JSON.parse(err.message);
    //getting error from zod validation middleware 
    return {
        statusCode: 400,
        success: false,
        message: 'Validation Error',
        errorMessage: errorMess.map((err) => err.message).join('. '),
    };
};
exports.default = handleZodError;
