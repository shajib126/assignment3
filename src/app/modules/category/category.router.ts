import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { categroyValidations } from './category.validation'
import { CategoryControllers } from './category.controller'
const router = express.Router()
router.post('/',validateRequest(categroyValidations.createCategoryValidationSchema),CategoryControllers.createCategory)
router.get('/',CategoryControllers.allCategory)

export const CategoryRouter = router