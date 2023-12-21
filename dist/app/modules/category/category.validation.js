"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categroyValidations = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'category name must be string',
            'required_error': 'category name is required'
        })
    })
});
exports.categroyValidations = {
    createCategoryValidationSchema
};
