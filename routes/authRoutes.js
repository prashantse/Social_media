const express = require('express');
const authController = require('../controller/authControllers');
const { validateCreateUser } = require('../middleware/validationMiddleware');
const router = express.Router();
const { upload } = require('../config/multerConfig')

router.route("/register").post(
    upload("profileImages").single('profileImage'),
    authController.register
);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);
router.post('/updatePassword', authController.updatePassword);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

module.exports = router;
