"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let success = false;
    let message = 'Something went wrong';
    let errorMessage = '';
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        success = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.success;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        success = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.success;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = 'sfsdf';
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        success = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.success;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        erroDetails: err,
        stack: err === null || err === void 0 ? void 0 : err.stack // i did this for both production and development variable because of P-Hero team chacking this code in production , otherwise should check if it's in development mood have to show the error stack otherwise showing null .  
    });
};
exports.default = globalErrorHandler;
