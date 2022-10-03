const Joi = require('joi');

module.exports = {
  createRecipe: Joi.object().keys({
    name: Joi.string().min(3).max(15).required(),
    description: Joi.string().min(6).max(60).required(),
    imagePath: Joi.string().required(),
  })
}
