const {Schema, model} = require('mongoose')

const recipeSchema = new Schema(
  {
      name: {
        type: String,
        require: true
      },
      description: {
        type: String,
        require: true
      },
      imagePath: {
        type: String,
        require: true
      },
      ingredients: [
        {
          name: String,
          amount: Number
        }
      ],
  },
);

module.exports = model('Recipes', recipeSchema)
