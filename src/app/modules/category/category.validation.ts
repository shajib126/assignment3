import {z} from 'zod'


const createCategoryValidationSchema = z.object({
    body:z.object({
        name:z.string({
            invalid_type_error:'category name must be string',
            'required_error':'category name is required'
        })
    })
})


export const categroyValidations = {
    createCategoryValidationSchema
}