const {recipeMiddleware} = require("../middlevares/index");
const {recipeController} = require("../controllers/index");
const router = require('express').Router();


router.get('/', recipeController.getRecipes)
router.post('/', recipeMiddleware.isRecipeValid, recipeController.createRecipe)


module.exports = router
