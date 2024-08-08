const userService = require('../services/userServices');
const responseMessages = require('../constants/responseMessages');

const getAllUser = async(req, res) =>{
  try {
    const users = await userService.getAllUser();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const getProfile = async (req, res) => { 
    try {
      const user = await userService.getUserById(req);
      res.status(200).json({  user });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const updateProfile = async (req, res) => { 
    try {
      const user = await userService.updateUser(req, res);
      res.status(201).json({ user });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteProfile = async (req, res) => {
    try {
      const deleteRes = await userService.deleteUserProfile(req, res);
      res.status(201).json({ deleteRes });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

 const  allCommentsOfUser = async (req, res) => {
  try {
    const comments = await userService.getAllCommentsOfUser(req);
    res.status(200).json({  comments });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 }

 const  allLikesOfUser = async (req, res) => {
  try {
    const likes = await userService.getAllLikesOfUser(req);
    res.status(200).json({  likes });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 }

 const getUser = async (req, res) => {
  try {
    const user = await userService.getUserWithId(req);
    res.status(200).json({  user });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 }

module.exports = {
    getProfile ,
    updateProfile,
    allCommentsOfUser,
    allLikesOfUser,
    deleteProfile,
    getAllUser,
    getUser,
  }