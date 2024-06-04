const router = require('express').Router();
const commentControllers = require('../controller/commentControllers');
const { verifyToken } = require('../middleware/tokenVerify')

router.route('/:postId/doComment').post(verifyToken, commentControllers.createComment);
router.route('/:commentId/deleteComment').delete(verifyToken, commentControllers.deleteComment);



module.exports = router