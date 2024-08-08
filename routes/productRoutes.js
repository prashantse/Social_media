const router = require('express').Router();
const productControllers = require('../controller/productControllers');
const { verifyToken } = require('../middleware/tokenVerify')
const { upload } = require('../config/multerConfig')

router.route('/addproduct').post(
    verifyToken,
    upload("productsImagesAndVideos").fields([{ name:"productsImagesAndVideos", maxCount:5} ]),
    productControllers.addProduct
);
router.route('/allproducts').get(verifyToken, productControllers.allproducts);



module.exports = router