const productService = require('../services/productServices');

const addProduct = async (req, res) =>{
    try {
        const product = await productService.addNewProduct(req);
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const allproducts = async (req, res) =>{
    try {
        const products = await productService.getAllProducts(req);
        res.status(201).json({ products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addProduct,
    allproducts,
}
