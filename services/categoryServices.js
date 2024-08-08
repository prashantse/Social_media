const { Category }= require('../models')

const addNewCategory = async (req) => {
    const { categoryName,parantId }= req.body
    addedBy=req.user.id
    if(!categoryName){
        return {
            status: 'fail',
            message: 'Category name is required',
        }
    }
    const category = await Category.create({
        categoryName,
        parantId,
        addedBy,
    })
    return({
        status:'category successfully added',
        data: category,
    })
}

const removeCategory = async (req) => {
    const  categoryId = req.params.CategoryId
    if(!categoryId){
        return {
            status: 'fail',
            message: 'Category id is required',
        }
    }
    const category = await Category.findByPk(categoryId)
    if (!category) {
        return {
            status: 'fail',
            message: 'Category not found',
        }
    }
    await category.destroy()
    return({
        status:'category successfully removed',
        data: category,
    })
}

const getAllCategories = async (req) => {
    const categories = await Category.findAndCountAll()
    if (!categories) {
        return {
            status: 'fail',
            message: 'Categories not found',
        }
    }
    return({
        status:'success',
        data: categories,
    })
}

module.exports = {
    addNewCategory,
    removeCategory,
    getAllCategories,
}