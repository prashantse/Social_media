const commentService = require('../services/commentServices')

const createComment = async (req, res) => {
    try {
        const commentRes = await commentService.createNewComment(req);
        res.status(201).json({ commentRes });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const commentRes = await commentService.destroyComment(req);
        res.status(201).json({ commentRes });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    createComment,
    deleteComment,
}