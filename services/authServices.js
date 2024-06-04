const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const responseMessages = require('../constants/responseMessages');
const { generateOtp, sendOtpEmail } = require('../utils/otpUtils');
const { generateToken } = require('../utils/tokenUtils');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');


const registerUser = async (req) => {
  const { username, email, password, bio } = req.body;
  
  if(!username || !email || !password){
    return ({
      status: 'fail',
      message: "username, email and password are required",
    });
  }
  if(username<=5){
    return ({
      status: 'fail',
      message: "username should be more than 5 characters",
    });
  }
  if(password.length<=7){
    return ({
      status: 'fail',
      message: "password should be more than 7 characters",
    });
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!regex.test(email)){
    return ({
      status: 'fail',
      message: "invalid email",
    });
  }
  if(bio && bio.length>100){
    return ({
      status: 'fail',
      message: "bio should be less than 100 characters",
    });
  }

  const existedUser = await User.findOne({
    where: {
      [Op.or]: [
        { username },
        { email }
      ]
    }
  });

  if (existedUser) {
    return ({
      status: 'fail',
      message: "username or email already exists",
    });
  }


  let profileImage;

  try {
    if (req.file ) {
      const mimeType = req.file.mimetype;
      profileImage = req.file.path;

      if (!mimeType.startsWith('image/')) {
        fs.unlinkSync(profileImage)
        return ({
          status: 'fail',
          message: 'Only image files are allowed',
        });
      }


    }
  } catch (err) {
    if (fs.existsSync(profileImage)) {
      fs.unlinkSync(profileImage);
    }

    return {
      status: 'fail',
      message: 'Internal server error' + err.message,
    }

  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    profileImage: profileImage || "public/defaultProfile.jpeg",
    otp,
    bio
  });

  sendOtpEmail(email, otp);
  const userResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }

  return userResponse;
};

const loginUser = async (req) => {

  const { email, password, otp } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found.');
  }


  if (user.firstTimeLogin) {
    if (!otp) {
      throw new Error('OTP not found');
    }
    if (otp !== user.otp) {
      throw new Error('Invalid OTP.');
    }

    user.otp = null;
    user.firstTimeLogin = false;
    await user.save();
  } else {

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password.');
    }
  }

  const token = generateToken(user.id);
  return token;
};


const verifyOtp = async (email, otp) => {
  const user = await User.findOne({ where: { email, otp } });
  if (!user) throw new Error(responseMessages.INVALID_OTP);

  user.otp = null;
  await user.save();

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};


const updateuserPassword = async (email, oldPassword, newPassword) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Couldn't find the user in the database");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("password mismatch, please try again");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return responseMessages.PASSWORD_UPDATED;
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendOTP = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Couldn't find the user in the database");
    }

    const otp = generateOtp()
    sendOtpEmail(email, otp);

    user.otp = otp;

    await user.save();

    return;
  } catch (error) {
    throw new Error(error.message);
  }
}

const changePassword = async (otp, newPassword) => {
  try {
    if (!otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'OTP and new password are required' });
    }
    if (otp.length !== 6) {
      return res.status(400).json({ success: false, message: 'OTP must be of 6 digits' });
    }

    if (newPassword.length <= 7) {
      return res.status(400).json({ success: false, message: 'Password must be at least of 8 characters' });
    }

    const user = req.user

    if (!user) {
      throw new Error('Invalid OTP');
    }

    user.otp = null;
    user.firstTimeLogin = true;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return responseMessages.PASSWORD_UPDATED;
  } catch (error) {
    throw new Error(error.message);
  }
}




module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  updateuserPassword,
  changePassword,
  sendOTP
};
