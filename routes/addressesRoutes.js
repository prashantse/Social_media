const router = require('express').Router();
const addressControllers = require('../controller/addressControllers');
const { verifyToken } = require('../middleware/tokenVerify')

router.route('/addAddress').post(verifyToken,addressControllers.addAddress);
router.route('/:addressId/deleteAddress').delete(verifyToken,addressControllers.deleteAddress);


module.exports = router