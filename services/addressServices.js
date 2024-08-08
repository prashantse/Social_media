const { Address }= require('../models')

const addAddress = async (req)=>{
    const { address, city, state, country, zip , phoneNo, addressType}= req.body
    const userId = req.user.id

    if(!address ||!city ||!state ||!country ||!zip||!phoneNo){
             throw new Error ('All fields are required')    
    }
    if(address.length > 100){
        throw new Error('Address must be less than 100 characters')
    }

    if(!phoneNo.length == 10){
        throw new Error('Phone number must be less than 40 characters')
    }
    const alreadyAdded = await Address.findOne({
        where:{
            userId,
            addressType
        }
    })

    if(alreadyAdded){
        throw new Error(`${addressType} Address already added `)
    }

    const userAddress = await Address.create({
        address,
        city,
        state,
        country,
        zip,
        userId,
        phoneNo,
        addressType: addressType || "Home",
    })
    return({
        status:'Address successfully added',
        data: userAddress,
    })
}
const removeAddress = async(req)=>{
    const addressId = req.params.addressId
    const userId = req.user.id

    if(!addressId){
        return {
            status: 'fail',
            message: 'Address id is required',
        }
    }
    const address = await Address.findOne({
        where:{
            id: addressId,
            userId
        }
    })
    if(!address){
        return {
            status: 'fail',
            message: 'Address not found',
        }
    }
    await address.destroy();
    return {
        status:'success',
        message: 'Address deleted successfully',
        address
    }
}

const updateAddress = async (req)=>{
    const addressId = req.params.addressId
    const userId = req.user.id

    if(!addressId){
        return {
            status: 'fail',
            message: 'Address id is required',
        }
    }
    const Useraddress = await Address.findOne({
        where:{
            id: addressId,
            userId
        }
    })
    if(!Useraddress){
        return {
            status: 'fail',
            message: 'Address not found',
        }
    }
    const { address, city, state, country, zip, phoneNo, addressType } = req.body
    

}

module.exports = {
    addAddress,
    removeAddress,
    updateAddress,
}