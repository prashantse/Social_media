const { Post } = require('../models');
const { Comment } = require('../models');
const { Like } = require('../models');
const path = require('path');
const fs = require('fs');
const { number } = require('joi');

const getAllPosts = async (req) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const { count, rows } = await Post.findAndCountAll({
    limit: limit,
    offset: offset
  });
  return ({
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: rows
  });

};

const createNewPost = async (req) => {
  const userId=req.user.id;
  const { title, contentType } = req.body
  const mediaUrl= req.file

  if (!mediaUrl ){
    return {
      status: 'fail',
      message: 'image or video not found',
    }
  }
  
  const mediaPath = mediaUrl.path;
  const mimeType = mediaUrl.mimetype;
 
   
  try{
    if (!mimeType.startsWith('image/') && !mimeType.startsWith('video/')) {
      fs.unlinkSync(mediaPath)
        return {
            status: 'fail',
            message: 'Only image and video files are allowed',
        };
        
    }

   const post = await Post.create({
        title,
        contentType,
        mediaUrl: mediaPath,
        userId
      });

      return {
        message: 'Post created successfully',
        post
      }

    }catch(err){

      if (fs.existsSync(mediaPath)) {
        fs.unlinkSync(mediaPath);
      }
      
      return {
        status: 'fail',
        message: 'Internal server error'+ err.message,
      }

    }

};

const getPostbyId = async (req)=>{
   const postId= req.params.postId;
   const post = await Post.findByPk(postId);
   if(!post){
     return {
       status: 'fail',
       message: 'Post not found',
     }
   }
   return post ;

}

const deletePostbyId = async (req)=>{
  const postId= req.params.postId;
  const post = await Post.findByPk(postId);
  if (!post) {
    return {
      status: 'fail',
      message: 'Post not found',
    }
  }

  fs.unlinkSync(post.mediaUrl)

  await post.destroy();
  return {
    status:'success',
    message: 'Post deleted successfully',
  }
  
}

const getAllPostOfAnUser = async (req) => {
  try {
    const userId = req.user.id

    if (isNaN(userId)) {
      return {
        status: 'fail',
        message: 'Invalid user ID',
      };
    }

    const posts = await Post.findAndCountAll({
      where: {
        userId: 40
      }
    });

    if (!posts || posts.length === 0) {
      return {
        status: 'fail',
        message: 'Posts not found',
      };
    }

    return {
      status: 'success',
      data: posts
    };

  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      status: 'error',
      message: 'An error occurred while fetching posts'
    };
  }
}

const getAllCommentsOnPost = async (req) => {
  try {
    const postId = req.params.postId;

    if (isNaN(postId)) {
      return {
        status: 'fail',
        message: 'Invalid post ID',
      };
    }

    const comments = await Comment.findAndCountAll({
      where: {
        postId: postId
      }
    });

    if (!comments || comments.count == 0) {
      return {
        status: 'fail',
        message: 'Comments not found',
      };
    }

    return {
      status:'success',
      data: comments
    };

  } catch (error) {
    console.error('Error fetching comments:', error);
    return {
      status: 'error',
      message: 'An error occurred while fetching comments'
    };
  }
}


const getAllLikesOnPost = async (req) => {
  try {
    const postId = req.params.postId;

    if (isNaN(postId)) {
      return {
        status: 'fail',
        message: 'Invalid post ID',
      };
    }

    const likes = await Like.findAndCountAll({
      where: {
        postId: postId
      }
    });

    if (!likes || likes.count == 0) {
      return {
        status: 'fail',
        message: 'Likes not found',
      };
    }

    return {
      status:'success',
      data: likes
    };
  }catch{
    console.error('Error fetching likes:', error);
    return {
      status: 'error',
      message: 'An error occurred while fetching likes'
    };
  }
}


module.exports = {
  getAllPosts,
  createNewPost,
  getPostbyId,
  deletePostbyId,
  getAllPostOfAnUser,
  getAllCommentsOnPost,
  getAllLikesOnPost
};
