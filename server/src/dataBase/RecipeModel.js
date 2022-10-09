const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
  {
    _id: {
      type: String,
      require: false,
    },
    __v: {
      type: Number,
      require: false,
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imagePath: {
      type: String,
      require: true,
    },
    ingredients: [
      {
        name: String,
        amount: Number,
      },
    ],
  },
);

module.exports = model('Recipes', recipeSchema);
