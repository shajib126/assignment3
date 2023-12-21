import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB =async (payload:TCourse,week:number) => {
    const result = await Course.create({
        title:payload.title,
        instructor:payload.instructor,
        categoryId:payload.categoryId,
        price:payload.price,
        tags:payload.tags,
        startDate:payload.startDate,
        endDate:payload.endDate,
        language:payload.language,
        provider:payload.provider,
        durationInWeeks:week,
        details:payload.details
    })
    return result
}

const getAllCourseFromDB =async (query:Record<string,unknown>) => {

  
   const {page,limit,sortBy,sortOrder,minPrice,maxPrice,tags,startDate,endDate,language,provider,durationInWeeks,level} = query
   
   const filter:any = {}
   if(minPrice !== undefined && maxPrice !== undefined){
   
    filter.$and = [{price:{$gt:parseFloat(minPrice as string),$lt:parseFloat(maxPrice as string)}}]
    //want range of prices that's why here i use $and it will check between minPrice and maxPrice 
    
   }   
   if(tags !== undefined){
    filter['tags.name'] = Array.isArray(tags) ? {$in:tags} : tags
    //to check tags name and filter by the tags name if it's in tags field or not 
   }
   if(startDate !== undefined && endDate !== undefined){
    //using $and to filtering range between startDate and endDate
    filter.$and = [{startDate:{$gt:startDate},endDate:{$lt:endDate}}]
   }
   if(language !== undefined){
    filter.language = language
   }
   if(provider !== undefined){
    filter.provider = provider
   }
   if(durationInWeeks !== undefined){
    //parsing in integer because getting durationInWeeks query in string 
    filter.durationInWeeks = parseInt(durationInWeeks as string)

   }
   if(level !== undefined){
    filter['details.level'] = level
   }
    
   const sortData:any = {}
   const sortFields = ['title','price','startDate','endDate','language','durationInWeeks']   
   

   if(sortBy !== undefined && sortFields.includes(sortBy as string)){
    sortData[sortBy as string] = sortOrder === 'desc' ? -1 : 1
   }
   
   const pageNumber = page ? parseInt(page as string) : 1
   const size = limit ? parseInt(limit as string) : 10
   const skip = (pageNumber - 1) * size

    const result = await Course.find(filter).sort(sortData).limit(size).skip(skip)
    return result
}

const updateCourseIntoDB =async (id:string,payload:Partial<TCourse>) => {
    const {details,tags, ...courseRemainingData} = payload

    const updateNormal = await Course.findByIdAndUpdate(id,courseRemainingData,{
        new:true,
        runValidators:true
    })
    if(!updateNormal){
        throw new Error('error')
    }
    if(details?.level){
        const updateLevel = await Course.findByIdAndUpdate(id,{'details.level':details.level},{new:true,runValidators:true})
    }
    if(details?.description){
        const updateDescription = await Course.findByIdAndUpdate(id,{'details.description':details.description},{new:true,runValidators:true})
    }
    
    if(tags && tags.length > 0){
        const deleteTags = tags.filter((el)=>el.name && el.isDeleted).map((el)=>el.name)


        const deleteTagsCourses = await Course.findByIdAndUpdate(id,{$pull:{
            tags:{name:{$in:deleteTags}}
        }},{new:true,runValidators:true})

       const newTags = tags?.filter((el)=>el.name && !el.isDeleted)
       const newTagscourse = await Course.findByIdAndUpdate(id,{$addToSet:{tags:{$each:newTags}}},{
        new:true,
        runValidators:true
       })
        
    }
    return updateNormal
}
const getCourseByIdReviewFromDB =async (id:string) => {
    const reviews = await Review.find({courseId:id}).select('-_id -updatedAt -createdAt -__v')
    const course = await Course.findById({_id:id})
    const final = {course,reviews}
    return final
}

const getBestCoursesFromBD =async () => {
    const result = await Review.aggregate([
        {
            $group:{
                _id:"$courseId",
                avarageRating:{$avg:"$rating"},
                totalReview:{$sum:1}
            }
        },
        {
            $sort:{
                avarageRating:-1,
                totalReview:-1
            }
        },
        {
            $limit:1
        }
    ])
    
        const maxRatingsReviewsCourse = result[0]._id
        const course = await Course.findById(maxRatingsReviewsCourse)
        const avarageRating = result[0].avarageRating
        const reviewCount = result[0].totalReview
        const final = {course,avarageRating,reviewCount}
        return final
    
    
}


export const CourseService = {
    createCourseIntoDB,
    updateCourseIntoDB,
    getAllCourseFromDB,
    getCourseByIdReviewFromDB,
    getBestCoursesFromBD
}