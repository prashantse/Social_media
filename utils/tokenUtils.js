
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  // Generate JWT token with userId payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
     expiresIn: '1d' });
  return token;
};

module.exports = { generateToken };

