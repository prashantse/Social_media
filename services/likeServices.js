const { Like } = require('../models');

const toggleLike = async (req) => {
    postId = req.params.postId
    if (!postId) {
        return {
            status: 'fail',
            message: 'Post not found',
        }
    }
    userId = req.user.id
    if (!userId) {
        return {
            status: 'fail',
            message: 'User not found',
        }
    }
    const alreadyLiked = await
        Like.findOne({
            where: {
                postId,
                userId
            }
        })
    if (alreadyLiked) {
        return {
            status: 'fail',
            message: 'You have already liked this post',
        }
    }

    const like = await Like.create({
        postId,
        userId
    })

    return {
        status: 'success',
        data: like
    }


}

const toggleDislike = async (req, res) => {
    try {
        postId = req.params.postId
        if (!postId) {
            return {
                status: 'fail',
                message: 'Post not found',
            }
        }
        userId = req.user.id
        if (!userId) {
            return {
                status: 'fail',
                message: 'User not found',
            }
        }
        const alreadyLiked = await
            Like.findOne({
                where: {
                    postId,
                    userId
                }
            })
        if (!alreadyLiked) {
            return {
                status: 'fail',
                message: 'You have not liked this post',
            }
        }

        await alreadyLiked.destroy()

        return {
            status: 'success',
            message: 'You have unliked this post',
        }

    } catch (err) {
        return {
            status: 'fail',
            message: err.message,
        }
    }
}



module.exports = {
    toggleLike,
    toggleDislike,

};