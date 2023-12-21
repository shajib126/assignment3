import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB =async (payload:TReview) => {
    const result = await Review.create({
        courseId:payload.courseId,
        rating:payload.rating,
        review:payload.review
    })
    return result
}


export const ReviewServies = {
    createReviewIntoDB
}