const { recipeValidator } = require('../validators');
const { RecipeDB } = require('../dataBase');

module.exports = {
  isRecipeValid: async (req, res, next) => {
    try {
      const { error } = await recipeValidator.createRecipe.validate(req.body);
      console.log('error: ', error);
      if (error) {
        return res.status(400).json({
          message: `${error.details[0].message}`,
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
