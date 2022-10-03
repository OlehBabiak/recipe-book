const fs = require('fs');
const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const {recipeRouter} = require("./src/routes")

mongoose
  .connect("mongodb+srv://OlehBabiak:NdMCuYEdQLmMRpWc@cluster0.rg1g0ph.mongodb.net/recipe-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is successfull");
  })
  .catch(( e ) => {
    console.log("no connection ");
  });

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/recipes', recipeRouter)

const start = async () => {
  try {
    if (!fs.existsSync('src')) {
      await fs.mkdirSync('src');
    }
    app.listen(8080, () => {
      console.log('App listen 8080');
    });
  } catch (err) {
    console.error(`Error on server startup: ${ err.message }`);
  }
};

start()
