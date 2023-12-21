"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const zod_1 = require("zod");
const tagsSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional()
});
const detailsSchema = zod_1.z.object({
    level: zod_1.z.string({
        invalid_type_error: 'Level must be string',
        required_error: 'Level is required'
    }),
    description: zod_1.z.string({
        invalid_type_error: 'description must be string',
        required_error: 'description is required'
    })
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: 'Title must be string',
            required_error: 'title is required'
        }),
        instructor: zod_1.z.string({
            invalid_type_error: 'instructor must be string',
            required_error: 'instructor is required'
        }),
        categoryId: zod_1.z.string({
            invalid_type_error: 'Category id must be string',
            required_error: 'category id is required'
        }),
        price: zod_1.z.number({
            invalid_type_error: 'price must be number',
            required_error: 'price is required'
        }),
        tags: zod_1.z.array(tagsSchema).optional(),
        startDate: zod_1.z.string({
            invalid_type_error: 'start date must be string',
            required_error: 'start date is required'
        }),
        endDate: zod_1.z.string({
            invalid_type_error: 'end date must be string',
            required_error: 'end date is required'
        }),
        language: zod_1.z.string({
            invalid_type_error: 'language must be string',
            required_error: 'language is required'
        }),
        provider: zod_1.z.string({
            invalid_type_error: 'provider must be string',
            required_error: 'provider is required'
        }),
        details: detailsSchema
    })
});
const updateDetailsSchema = zod_1.z.object({
    level: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(tagsSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        details: updateDetailsSchema
    })
});
exports.CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
};
