const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const responseMessages = require('../constants/responseMessages');
const { generateOtp, sendOtpEmail } = require('../utils/otpUtils');
const { generateToken } = require('../utils/tokenUtils');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const {uploadOnCloudinary} = require('../utils/cloudinary');
const { promises } = require('dns');


const registerUser = async (req) => {
  const { username, email, password, bio, firstName, lastName } = req.body;
  let profileImage;

  try {
    if (req.file) {
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

  if (!username || !email || !password || !firstName) {
    fs.unlinkSync(profileImage);
    return ({
      status: 'fail',
      message: "username, email, firstName,lastName and password are required",
    });
  }

  const userRegex = /^[0-9A-Za-z]{6,16}$/
  if (!userRegex.test(username)) {
    fs.unlinkSync(profileImage);
    return ({
      status: 'fail',
      message: "username should contain only alphanumeric characters and must be of 6 to 16 characters (Not even a space)",
    });
  }


  const pasRegex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
  if (!pasRegex.test(password)) {
    fs.unlinkSync(profileImage);
    return ({
      status: 'fail',
      message: "password should contain at least one number, one special character, one uppercase letter and one letter. The length must be in between 8 to 32",
    });
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(email)) {
    fs.unlinkSync(profileImage);
    return ({
      status: 'fail',
      message: "invalid email",
    });
  }
  if (bio && bio.length > 100) {
    fs.unlinkSync(profileImage);
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
    fs.unlinkSync(profileImage);
    return ({
      status: 'fail',
      message: "username or email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();

 const secure_url= await uploadOnCloudinary(profileImage)
 console.log(secure_url); 
 

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    profileImage: secure_url || "public/defaultProfile.jpeg",
    otp,
    bio
  });

  sendOtpEmail(email, otp);

  const userResponse = {
    message: 'User created successfully',
    data: {
      id: user.id,
      username: user.username,
      fullname: user.firstName + ' ' + user.lastName,
      email: user.email,
      profileImage: user.profileImage,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  return userResponse;
};

const loginUser = async (req) => {

  const { email, password, otp } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {
        statusCode: 404,
        message: 'User not found',
      }
  }

  if (user.firstTimeLogin) {
    if (!otp) {
      return {
        statusCode: 404,
        message: 'user not found'
      }
    }
    if (otp !== user.otp) {
      return {
        statusCode: 404,
        message: 'OTP not found'
      }
    }

    user.otp = null;
    user.firstTimeLogin = false;
    await user.save();
  } else {

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: 400,
        message: 'Password incorrect'
      }
    }
  }
  const fullname = user.firstName + ' ' + user.lastName;
  const token = generateToken(user.id);
  const loginRes = {
    statusCode: 200,
    message: `login successful, welcome ${fullname}`,
    token

  }

  return loginRes;
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
    if (!email || !oldPassword || !newPassword) {
      throw new Error("email, oldPassword and newPassword are required");
    }

    const pasRegex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
    if (!pasRegex.test(password)) {
      return ({
        status: 'fail',
        message: "password should contain at least one number, one special character, one uppercase letter and one letter. The length must be in between 8 to 32",
      });
    }

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

const changePassword = async (req) => {
  const { otp, newPassword, email } = req.body
  try {
    if (!otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'OTP and new password are required' });
    }
    if (otp.length !== 6) {
      return res.status(400).json({ success: false, message: 'OTP must be of 6 digits' });
    }

    const pasRegex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
    if (!pasRegex.test(newPassword)) {
      return ({
        status: 'fail',
        message: "password should contain at least one number, one special character, one uppercase letter and one letter. The length must be in between 8 to 32",
      });
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      return { success: false, message: "invalid email" };
    }

    const user = await User.findOne({ email: email });

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
