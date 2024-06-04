const router = require('express').Router();
const likeControllers = require('../controller/likeControllers');
const { verifyToken } = require('../middleware/tokenVerify')

router.route('/:postId/doLike').post(verifyToken, likeControllers.likePost);
router.route('/:postId/doDislike').delete(verifyToken, likeControllers.unlikePost);


module.exports = router