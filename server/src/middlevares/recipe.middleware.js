const {recipeValidator} = require("../validators");
module.exports = {
  isRecipeValid: async ( req, res, next ) => {
    try {
      const {error} = await recipeValidator.createRecipe.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: `${error.details[0].message} 111`
        })
      }
      next();
    } catch (e) {
      next(e);
    }
  },
}
