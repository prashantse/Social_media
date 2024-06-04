const postService = require('../services/postServices');
const responseMessages = require('../constants/responseMessages');
const { all } = require('../routes/authRoutes');

const allPosts = async (req, res) => { 
    try {
      const user = await postService.getAllPosts(req);
      res.status(201).json({ user });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };  
  
  const createPost = async (req, res) => {
    try {
      const user = await postService.createNewPost(req);
      res.status(201).json({ user });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const getPost = async (req, res) => {
    try {
      const user = await postService.getPostbyId(req);
      res.status(201).json({ user });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  }
  
  const deletePost = async (req, res) => {
    try {
      const user = await postService.deletePostbyId(req);
      res.status(201).json({ user});
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  }

  const PostOfAnUser = async (req,res) => {
    try {
      const posts = await postService.getAllPostOfAnUser(req);
      res.status(201).json({ posts});
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  }

  const allCommentsOnPost = async (req,res) => {
    try {
      const comments = await postService.getAllCommentsOnPost(req);
      res.status(201).json({ comments});
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const allLikesOnPost = async (req,res) => {
    try {
      const likes = await postService.getAllLikesOnPost(req);
      res.status(201).json({ likes});
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  module.exports = {
    allPosts,
    createPost,
    getPost,
    deletePost,
    PostOfAnUser,
    allCommentsOnPost,
    allLikesOnPost
  }