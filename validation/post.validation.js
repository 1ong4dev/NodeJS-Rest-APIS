const Joi = require('joi');

const PostSchemaValidation = Joi.object({
    title: Joi.string().required().min(5).messages({
        "string.empty": "Title is required",
        "string.min":"Mininum value for title is 5 characters",
        "any.required": "Title is required"
    }),
    content: Joi.string().messages({
        "string.empty": "Content is required",
    }),
    status: Joi.string().required().valid('draft', 'published').messages({
        "any.only": "Status must be either 'draft' or 'published'",
        "string.empty": "Status is required",
        "any.required": "Status is required"
    }),
    bannerImage: Joi.string().messages({
       "string.empty": "Banner image is required",
    }),
});


module.exports = {
    PostSchemaValidation
}