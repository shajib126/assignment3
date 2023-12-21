import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { ReviewValidations } from './review.validation'
import { ReviewControllers } from './review.controller'

const router = express.Router()
router.post('/',validateRequest(ReviewValidations.reviewValidationSchema),ReviewControllers.createReview)

export const ReviewRouter = router