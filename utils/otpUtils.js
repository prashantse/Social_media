const crypto = require('crypto');
const { sendEmail } = require('./emailUtils');

const generateOtp = () => {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10); // Generate random digit (0-9)
    }
    return otp;
  };

const sendOtpEmail = async (email, otp) => {
  const subject = 'Your OTP Code';
  const text = `Your OTP code is ${otp}. Please use this OTP when you login into our app for the first time.`;
  await sendEmail(email, subject, text);
};

module.exports = {
  generateOtp,
  sendOtpEmail
};
