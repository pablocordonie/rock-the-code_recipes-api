const express = require('express');
const recipesRouter = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { getRecipes, postRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe');

recipesRouter.get('/', getRecipes);

recipesRouter.post('/', isAuth, upload.single('img'), postRecipe);

recipesRouter.put('/:id', isAdmin, upload.single('img'), updateRecipe);

recipesRouter.delete('/:id', isAdmin, deleteRecipe);

module.exports = recipesRouter;