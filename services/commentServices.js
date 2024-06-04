const { Comment } = require('../models');


const createNewComment = async (req) => {
    try {
        const { content } = req.body;
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

        const comment = await Comment.create({
            postId,
            userId,
            content
        })

        return {
            status: 'success',
            data: comment
        }
    } catch (err) {
        return {
            status: 'fail',
            message: err.message,
        }
    }

}

const destroyComment = async (req) => {
    try {
        const id = req.params.commentId
        const comment = await Comment.findByPk(id)

        if (!comment) {
            return {
                status: 'fail',
                message: 'Comment not found',
            }
        }

        await comment.destroy()

        return {
            status: 'success',
            message: 'Comment deleted successfully',
        }

    } catch (err) {
        return {
            status: 'fail',
            message: err.message,
        }
    }


}


module.exports = {
    createNewComment,
    destroyComment,

};
