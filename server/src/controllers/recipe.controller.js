const {RecipeDB} = require("../dataBase");
module.exports = {

  getRecipes: async ( req, res, next ) => {
    try {
      const recipes = await RecipeDB.find();
      return res.status(200).json({
        recipes
      })
    } catch (e) {
      next(e)
    }
  },

  deleteRecipe: async ( req, res, next ) => {
    try {
      await RecipeDB.remove();
      return res.status(200).json({
        message: 'Recipe were deleted',
      });
    } catch (e) {
      next(e)
    }
  },

  createRecipe: async ( req, res, next ) => {
    try {
      const recipeData = req.body;
      await RecipeDB.create(recipeData)
      res.status(200).json({
        message: 'Recipe created successfully',
      });
    } catch (e) {
      next(e)
    }
  },

  getRecipeById: async ( req, res, next ) => {
    try {

    } catch (e) {
      next(e)
    }
  },

  updateRecipeById: async ( req, res, next ) => {
    try {

    } catch (e) {
      next(e)
    }
  },

  deleteRecipeById: async ( req, res, next ) => {
    try {

    } catch (e) {
      next(e)
    }
  }
}
