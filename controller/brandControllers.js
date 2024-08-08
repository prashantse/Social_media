const brandService= require('../services/brandServices');

const allBrands = async (req, res, next) => {
    try {
        const brands = await brandService.allBrands(req);
        res.status(201).json({ brands });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const addNewBrand = async (req, res, next) => {
    try {
        const brand = await brandService.addNewBrand(req);
        res.status(201).json({ brand });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const removeBrand = async (req, res, next) => {
    try {
        const brand = await brandService.removeBrand(req);
        res.status(201).json({ brand });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addNewBrand,
    allBrands,
    removeBrand,
}