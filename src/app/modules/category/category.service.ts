import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB =async (payload:TCategory) => {
    const result = await Category.create(payload) //create category
    return result 
}

const allCategoriesFromDB =async () => {
    const result = await Category.find()
    return result
}

export const CategoryServices = {
    createCategoryIntoDB,
    allCategoriesFromDB
}