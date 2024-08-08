const { where } = require('sequelize')
const { Product } = require('../models')
const { Category } = require('../models')
const { Brand } = require('../models')
const { ProductVariant } = require('../models')
const { User } = require('../models')
const { Op } = require('sequelize');
const fs = require('fs');

const removeFiles = (req)=>
    {
    const files = req.files.productsImagesAndVideos;
        files.forEach(file => {
        if(fs.existsSync(file.path)){
        fs.unlinkSync(file.path)}
    })
}

const addNewProduct = async (req) => {
  try {
    const { name, price, categoryId, brandName, stock, variantName, variantValue  } = req.body
    if(!name||!price||!categoryId||!brandName||!stock){
       throw new Error('name,price,categoryId,stock and Brand-Name are required')
    }
    if(name.length > 40){
        throw new 
        Error('Name must be less than 40 characters')
   }

    if(price<0){
        throw new 
        Error('Price must be greater than 0')
    }

    if(stock<1){ 
        throw new 
        Error('Stock must be greater than 0')
    }

    const files = req.files.productsImagesAndVideos;
    const productsImagesAndVideos = files.map(file => file.path);
    const sellerId = req.user.id;

    let brand = await Brand.findOne({ where: { name: brandName } });
    if (!brand) {
      brand = await Brand.create({ name: brandName, addedBy: sellerId });
    }

    // Check if the variant exists, otherwise create it
    let variant = await ProductVariant.findOne({ where: { variantName: variantName, value: variantValue } });
    if (!variant) {
      variant = await ProductVariant.create({ variantName: variantName, value: variantValue });
    }

    const product = await Product.create({
        name,
        price,
        categoryId,
        brandId: brand.id,
        sellerId,
        stock,
        productsImagesAndVideos,
        variantId: variant.id
    })
    const productRes = {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        brandName: brand.name,
        sellerId: product.sellerId,
        variantName:variant.variantName,
        variantValue:variant.value,
        productsImagesAndVideos: product.productsImagesAndVideos,
    }
    return productRes   
  } catch (error) {
    removeFiles(req)
    throw new Error(error.message)  
  }

}

const getAllProducts = async (req) => {
 try {    
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pagesize) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 1000000000000000000000000000000000000000000000000000000;
        
        const { count, rows } = await Product.findAndCountAll({
          where:{
             price :{[Op.between]: [minPrice, maxPrice]}
          },
          include: [
            {
              model: Category,
              attributes: ['id', 'categoryName'],
            },
            {
              model: ProductVariant,
              attributes: ['id', 'variantName', 'value'],
            },
            {
              model: User,
              attributes: ['id', 'username'],
            },
          ],
          attributes: ['id', 'name', 'price', 'stock', 'brandId', 'productsImagesAndVideos'],
          limit: limit,
          offset: offset,
          order: [['id', 'ASC']], // Optional: to sort the results
        });
        return ({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            pageSize: pageSize,
            data: rows
          });
        }catch(error) {
          throw new Error(error.message);
        }
};

module.exports = {
    addNewProduct,
    getAllProducts
}

