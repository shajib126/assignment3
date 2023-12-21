"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//handle validation error
const handleValidationError = (err) => {
    //getting validation error
    return {
        statusCode: 400,
        success: false,
        message: 'Validation Error',
        errorMessage: ''
    };
};
exports.default = handleValidationError;
