const Joi = require('joi')


const createUserSchema = Joi.object({
    username: Joi.string()
        .min(2)
        .max(30)
        .required()
    ,

    email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .required(),

    password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$'))
    .required(),

    profileImage: Joi.string(),

    bio: Joi.string()
        .min(10)
        .max(200)

}).options({ abortEarly: false }); 

module.exports = {
    createUserSchema
}