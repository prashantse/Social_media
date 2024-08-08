const router = require('express').Router();
const { verifyToken } = require('../middleware/tokenVerify')
const { upload } = require('../config/multerConfig')

const { updateProfile , getProfile, allCommentsOfUser, allLikesOfUser, deleteProfile , getAllUser,getUser} = require('../controller/userControllers');
const { route } = require('./authRoutes');

router.route('/').get(verifyToken,getAllUser); 
router.route('/updateProfile').patch(
    verifyToken ,
    upload('profileImage').single('profileImage') ,
    updateProfile);
router.route('/allLikesOfUser').get(verifyToken, allLikesOfUser);
router.route('/allCommentsOfUser').get(verifyToken,allCommentsOfUser);
router.route('/deleteProfile').delete(verifyToken,deleteProfile);
router.route('/getProfile').get(verifyToken ,getProfile);
router.route('/:userId').get(verifyToken ,getUser);


module.exports = router;