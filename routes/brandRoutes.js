const router = require('express').Router();
const brandControllers = require('../controller/brandControllers');
const { verifyToken } = require('../middleware/tokenVerify')

router.route('/allBrands').get(verifyToken,brandControllers.allBrands)
router.route('/addBrand').post(verifyToken,brandControllers.addNewBrand);
router.route('/:brandId/removeBrand').delete(verifyToken,brandControllers.removeBrand);

module.exports = router