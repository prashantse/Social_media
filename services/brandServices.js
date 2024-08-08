const { Brand }= require('../models')

const allBrands = async(req)=>{
    const brands = await Brand.findAndCountAll({
        attributes: ['id', 'name'],
    })
    return({
        status:'All brands',
        data: brands,
    })
}

const addNewBrand = async (req) => {
    const { name }= req.body
    const addedBy = req.user.id
    if(!name){
        return {
            status: 'fail',
            message: 'brand name is required',
        }
    }
    const brand = await Brand.create({
        name,
        addedBy,
    })
    return({
        status:'Brand successfully added',
        data: brand,
    })
}


const removeBrand = async (req) => {

    const  brandId = req.params.brandId

    if(!brandId){
        return {
            status: 'fail',
            message: 'Brand id is required',
        }
    }
    const brand = await Brand.findByPk(brandId)
    if (!brand) {
        return {
            status: 'fail',
            message: 'Brand not found',
        }
    }
    await brand.destroy()
    return({
        status:'Brand successfully removed',
       removerd_data: brand,
    })
}

module.exports = {
    addNewBrand,
    allBrands,
    removeBrand,
}