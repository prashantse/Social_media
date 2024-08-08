const router = require('express').Router();
const categoryControllers = require('../controller/categoryControllers');
const { verifyToken } = require('../middleware/tokenVerify');
const { route } = require('./authRoutes');

router.route('/allCategories').get(verifyToken,categoryControllers.allCategories);
router.route('/addCategory').post(verifyToken,categoryControllers.addNewCategory);
router.route('/:CategoryId/deleteCategory').delete(verifyToken,categoryControllers.deleteCategory);


module.exports = router