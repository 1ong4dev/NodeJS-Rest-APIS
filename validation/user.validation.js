const Joi = require('joi');


const UserSchemaValidation = Joi.object({
    name: Joi.string().required().min(5).max(30).messages({
        "string.empty": "Name is required",
        "string.min": "Mininum value for name is 5 characters",
        "string.max": "Maxinum value for name is 30 characters",
        "any.required": "Name is required"
    }),
    email: Joi.string().required().email().messages({
        "any.required": "Email is required",
        "string.empty":"Email is required",
        "string.email":"email must be a valid email address"
    }),
    password: Joi.string().required().min(5).messages({
        "string.empty": "Password is required",
        "string.min":"Mininum value for password is 5 characters",
        "any.required": "Password is required"
    }),
    gender: Joi.string().valid("male", "famale","other").required().messages({
        "any.only": "Gender value must match wither with male, famale or other",
        "any.required":"Gender is required"
    })
  
});

module.exports = {
    UserSchemaValidation
};