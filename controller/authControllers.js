const authService = require('../services/authServices');
const responseMessages = require('../constants/responseMessages');

const register = async (req, res) => { 
  try {
    const user = await authService.registerUser(req);
    res.status(201).json({user});
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.loginUser(req);
    res.status(200).json({message:"Loged in ", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const token = await authService.verifyOtp(req.body.email, req.body.otp);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const password = await authService.updateuserPassword(req.body.email, req.body.oldPassword, req.body.newPassword);
    res.status(200).json({ password });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const password = await authService.sendOTP(req.body.email);
    res.status(200).json({ message: "otp send for reset password" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const password = await authService.changePassword( req);
    res.status(200).json({ message: "Password reseted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
  updatePassword,
  forgotPassword,
  resetPassword
};
