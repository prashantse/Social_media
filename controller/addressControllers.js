const addressService= require('../services/addressServices');

const addAddress = async (req, res, next) => {
    try {
        const address = await addressService.addAddress(req);
        res.status(201).json({ address });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteAddress = async (req, res, next) => {
   try {
        const address = await addressService.removeAddress(req);
        res.status(201).json({ address });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    addAddress,
    deleteAddress,
}