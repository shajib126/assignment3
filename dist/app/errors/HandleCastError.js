"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlecastErr = (err) => {
    return {
        statusCode: 400,
        success: false,
        message: 'Ivalid ID',
        errorMessage: `${err === null || err === void 0 ? void 0 : err.value} is not a valid ID!`
    };
};
exports.default = handlecastErr;
