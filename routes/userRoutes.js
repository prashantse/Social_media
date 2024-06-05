const router = require('express').Router();
const { verifyToken } = require('../middleware/tokenVerify')
const { upload } = require('../config/multerConfig')

const { updateProfile , getProfile, allCommentsOfUser, allLikesOfUser, deleteProfile} = require('../controller/userControllers');

// router.route('/').get(getAllUser); 
router.route('/updateProfile').patch(
    verifyToken ,
    upload.single('profileImage') ,
    updateProfile);
router.route('/allLikesOfUser').get(verifyToken, allLikesOfUser);
router.route('/allCommentsOfUser').get(verifyToken,allCommentsOfUser);
router.route('/deleteProfile').delete(verifyToken,deleteProfile);
router.route('/getProfile').get(verifyToken ,getProfile);


module.exports = router;