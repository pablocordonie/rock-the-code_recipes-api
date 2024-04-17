const express = require('express');
const recipesRouter = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getRecipes, postRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe');

recipesRouter.get('/', getRecipes);

recipesRouter.post('/', isAuth, postRecipe);

recipesRouter.put('/:id', isAdmin, updateRecipe);

recipesRouter.delete('/:id', isAdmin, deleteRecipe);

module.exports = recipesRouter;