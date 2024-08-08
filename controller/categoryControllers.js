const categoryService= require('../services/categoryServices');


const addNewCategory = async (req, res, next) => {
    try {
        const category = await categoryService.addNewCategory(req);
        res.status(201).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteCategory = async (req, res, next) => {
    try {
        const category = await categoryService.removeCategory(req);
        res.status(201).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const allCategories = async(req, res, next) =>{
    try {
        const category = await categoryService.getAllCategories(req);
        res.status(201).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addNewCategory,
    deleteCategory,
    allCategories,
}