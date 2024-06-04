const likeService = require('../services/likeServices')


const likePost = async (req, res) => {
    try {
        const likeRes = await likeService.toggleLike(req);
        res.status(201).json({  likeRes });
        
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}

const unlikePost = async (req, res) => {
    try {
        const dislikeRes = await likeService.toggleDislike(req);
        res.status(201).json({  dislikeRes });
        
      } catch (error) {
        res.status(400).json({ error: error.message ,});
      }

}




module.exports = {
    likePost,
    unlikePost,

}
