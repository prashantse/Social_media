const { Sequelize } = require('sequelize');
const { User } = require('../models');
const { Comment } = require('../models');
const { Like } = require('../models');
const responseMessages = require('../constants/responseMessages');
const path = require('path');
const fs = require('fs');


// const getAllUser = catchAsync(async (req, res, next) => {
//     const users = await user.findAndCountAll({
//         where: {
//             userType: {
//                 [Sequelize.Op.ne]: '0',
//             },
//         },
//         attributes: { exclude: ['password'] },
//     });
//     return res.status(200).json({
//         status: 'success',
//         data: users,
//     });
// });

const getUserById = async (req) => {
    const userProfile = req.user

    if (!userProfile) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }
   const profileResponse = {
    id: userProfile.id,
    username: userProfile.username,
    fullname: userProfile.firstName+' '+userProfile.lastName,
    email: userProfile.email,
    profileImage: userProfile.profileImage,
    bio: userProfile.bio,
    createdAt: userProfile.createdAt,
    updatedAt: userProfile.updatedAt,
    }
    
    return ({
        status: `got ${profileResponse.fullname} profile `,
        data: profileResponse,
    });
};

const updateUser = async (req, res) => {
    const { username, email, bio, firstName, lastName } = req.body
    const userProfile = req.user;

    if (!userProfile) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

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
      

            if (userProfile.profileImage) {
                const oldImagePath = path.resolve(__dirname, '../', userProfile.profileImage);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old profile image:', err);
                    } else {
                        console.log('Old profile image deleted:', oldImagePath);
                    }
                });
            }

            userProfile.profileImage = profileImage;
        }
    } catch (err) {
        if (fs.existsSync(mediaPath)) {
            fs.unlinkSync(mediaPath);
        }

        return {
            status: 'fail',
            message: 'Internal server error' + err.message,
        }
    }

    if (username) {
        if(username.length < 5) {
            return ({
                status: 'fail',
                message: 'Username must be at least of 5 characters',
            });
        }
        userProfile.username = username;
    }

    if (email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!regex.test(email)){
          return ({
            status: 'fail',
            message: "invalid email",
          });
        }
        userProfile.email = email;
    }

    if (bio) {
        if(bio.length > 100){
            return ({
                status: 'fail',
                message: 'Bio must be less than 100 characters',
            });
        }
        userProfile.bio = bio;
    }
    if (firstName) {
        if(firstName.length > 20 || firstName.length<=0){
            return ({
                status: 'fail',
                message: 'Firstname must be less than 20 characters or atleast have some value',
            });
        }
        userProfile.firstName = firstName;
    }
    if (lastName) {
        if(lastName.length > 20 || lastName.length<=0){
            return ({
                status: 'fail',
                message: 'Lasttname must be less than 20 characters or atleast have some value',
            }); 
        }
        userProfile.lastName = lastName;
    }

    const updatedResult = await userProfile.save();
    const updateResponse = {
        id: updatedResult.id,
        username: updatedResult.username,
        fullname: updatedResult.firstName+' '+updatedResult.lastName,
        email: updatedResult.email,
        profileImage: updatedResult.profileImage,
        bio: updatedResult.bio,
        createdAt: updatedResult.createdAt,
        updatedAt: updatedResult.updatedAt,
    }

    return {
        status: 'updated successfully',
        data: updateResponse
    };
};

const deleteUserProfile = async(req , res , next) => {
    const  userProfile  = req.user;
    const fullname = req.user.firstName+' '+req.user.lastName;

    if (!userProfile) {
        return res.json({
            status: 'fail',
            message: 'User not found',
        });
    }

    await userProfile.destroy();

    return {
        status:'success',
        message: `User(${fullname}) deleted successfully`,
    };

};


const getAllCommentsOfUser = async (req) => {
    try {
        const userId = req.user.id
        const fullname = req.user.firstName+' '+req.user.lastName;
        if (isNaN(userId)) {
            return {
                status: 'fail',
                message: 'User not found',
            }
        }

        const comments = await Comment.findAndCountAll({
            where: {
                userId: userId,
            },
            attributes: { exclude: ['password'] },
        });
        if (comments.count == 0) {
           return {
            status: 'fail',
            message: 'Comments not found',
           }
        }
        return ({
            status: `got ${fullname} comments `,
            data: comments,
        });
    } catch (err) {
        return {
            status: 'fail',
            message: 'Internal server error',
        }
    }
}

const getAllLikesOfUser= async(req)=>{
    try {
       const userId = req.user.id;
       const fullname = req.user.firstName+' '+req.user.lastName;
        if (!userId) {
            return {
                status: 'fail',
                message: 'User not found',
            }
        }

        const likes = await Like.findAndCountAll({
            where: {
                userId: userId,
            },
            attributes: { exclude: ['password'] },
        });

        if (likes?.count == 0) {
           return {
            status: 'fail',
            message: 'Likes not found',
           }
        }
        return ({
            status: `got ${fullname}'s all likes `,
            data: likes,
        });
    } catch (err) {
        return {
            status: 'fail',
            message: 'Internal server error',
        }
    }
}

module.exports = {
    updateUser,
    getUserById,
    getAllCommentsOfUser,
    getAllLikesOfUser,
    deleteUserProfile
};