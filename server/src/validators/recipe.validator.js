const Joi = require('joi');

module.exports = {
  createRecipe: Joi.object().keys({
      recipes: Joi.array().items({
        _id: Joi.string(),
        __v: Joi.number(),
        name: Joi.string().min(3).max(25).required(),
        description: Joi.string().min(6).max(100).required(),
        imagePath: Joi.string().required(),
        ingredients: Joi.array().items({
          name: Joi.string(),
          amount: Joi.number().integer().required()
        })
      })
    }
  )
}
