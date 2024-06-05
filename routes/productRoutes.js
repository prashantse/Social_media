const router = require('express').Router();
const productControllers = require('../controller/productControllers');
const { verifyToken } = require('../middleware/tokenVerify')




module.exports = router