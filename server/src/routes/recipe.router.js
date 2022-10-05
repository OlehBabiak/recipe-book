const {recipeMiddleware} = require("../middlevares/index");
const {recipeController} = require("../controllers/index");
const {authMiddleware} = require("../middlevares");
const router = require('express').Router();

router.use('/', authMiddleware.checkAccessToken)

router.get('/', recipeController.getRecipes)
router.put('/', recipeMiddleware.isRecipeValid, recipeController.createRecipe)


module.exports = router
