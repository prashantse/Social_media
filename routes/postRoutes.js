const router = require('express').Router();
const postController = require('../controller/postControllers');
const { verifyToken } = require('../middleware/tokenVerify')
const { upload } = require('../config/multerConfig')

const express = require('express');

router.route('/').get(verifyToken,postController.allPosts)
router.route('/createPost').post(
    verifyToken,
    upload("posts").single('mediaUrl'),
    postController.createPost
)
router.route('/userposts/').get(verifyToken, postController.PostOfAnUser)

router.route('/:postId').get(verifyToken, postController.getPost)
router.route('/:userId/posts').get(verifyToken, postController.getPostsOfUser)
router.route('/:postId/delete').get(verifyToken, postController.deletePost)
router.route('/:postId/allComments').get(verifyToken, postController.allCommentsOnPost)
router.route('/:postId/allLikes').get(verifyToken, postController.allLikesOnPost)




module.exports = router
 