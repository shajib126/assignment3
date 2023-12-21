import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

//category model
const categorySchema = new Schema<TCategory>({
    name:{
        type:String,
        required:true
    }
})

export const Category = model<TCategory>('Category',categorySchema)