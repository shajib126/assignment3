import {any, z} from 'zod'
import { Course } from './course.model'

const tagsSchema = z.object({
    
        name:z.string(),
        isDeleted:z.boolean().optional()
    
})
const detailsSchema = z.object({
    
        level:z.string({
            invalid_type_error:'Level must be string',
            required_error:'Level is required'
        }),
        description:z.string({
            invalid_type_error:'description must be string',
            required_error:'description is required'
        })
    
    
})
const createCourseValidationSchema = z.object({
    body:z.object({
        title:z.string({
            invalid_type_error:'Title must be string',
            required_error:'title is required'
        }),
        instructor:z.string({
            invalid_type_error:'instructor must be string',
            required_error:'instructor is required'
        }),
        categoryId:z.string({
            invalid_type_error:'Category id must be string',
            required_error:'category id is required'
        }),
        price:z.number({
            invalid_type_error:'price must be number',
            required_error:'price is required'
        }),
        tags:z.array(tagsSchema).optional(),
        startDate:z.string({
            invalid_type_error:'start date must be string',
            required_error:'start date is required'
        }),
        endDate:z.string({
            invalid_type_error:'end date must be string',
            required_error:'end date is required'
        }),
        language:z.string({
            invalid_type_error:'language must be string',
            required_error:'language is required'
        }),
        provider:z.string({
            invalid_type_error:'provider must be string',
            required_error:'provider is required'
        }),
        details:detailsSchema
    })
})


const updateDetailsSchema = z.object({
    
    level:z.string().optional(),
    description:z.string().optional()


})
const updateCourseValidationSchema = z.object({
    body:z.object({
        title:z.string().optional(),
        instructor:z.string().optional(),
        categoryId:z.string().optional(),
        price:z.number().optional(),
        tags:z.array(tagsSchema).optional(),
        startDate:z.string().optional(),
        endDate:z.string().optional(),
        language:z.string().optional(),
        provider:z.string().optional(),
        details:updateDetailsSchema
    })
})

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}