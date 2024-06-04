const { createUserSchema } = require('../utils/validation');

function validate(schema){
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.json({
                success: false,
                message: 'Validation error',
                details: error.details.map(detail => detail.message)
            });
        }
        next();
    };
}

function tokenvalidate(token){

}
const validateCreateUser = validate(createUserSchema);

module.exports = {
    validateCreateUser
};