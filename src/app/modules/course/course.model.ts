import mongoose, { Schema, model } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";
import AppError from "../../errors/AppError";

//course model
const tagsSchema = new Schema<TTags>({
    name:{type:String},
    isDeleted:{
        type:Boolean,
        default:false
    }
},{_id:false,timestamps:true})

const detailsSchema = new Schema<TDetails>({
    level:String,
    description:String
},{_id:false,timestamps:true})

const courseSchema = new Schema<TCourse>({
    title:{
        type:String,
        required:true,
        unique:true
    },
    categoryId:{
        type:Schema.Types.ObjectId, //store Category Id
        ref:'Category'
    },
    price:{
        type:Number
    },
    instructor:{
        type:String,
        required:true,
        
    },
    tags:[tagsSchema],
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    },
    durationInWeeks:{
        type:Number,
        required:true
    },
    details:detailsSchema

},{timestamps:true})

courseSchema.pre('save', async function(next){
    const isTitleExist = await Course.findOne({title:this.title})
    if(isTitleExist){
        throw new AppError(400,'title is already exists!')
    }
    next()
})

export const Course = model<TCourse>("Course",courseSchema)