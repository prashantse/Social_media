const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const userId = decodedToken?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'invalid token'
            });
        }
    
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password', 'refreshToken' ,] }
        });
    
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'invalid token'
            });
        }
    
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'invalid token err'+error.message
        });
    }
}


module.exports = {
    verifyToken
};
