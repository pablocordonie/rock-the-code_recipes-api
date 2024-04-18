const mainRouter = require('express').Router();
const ingredientsRouter = require('./ingredient.routes');
const recipesRouter = require('./recipe.routes');
const usersRouter = require('./user.routes');

mainRouter.use('/ingredients', ingredientsRouter);
mainRouter.use('/recipes', recipesRouter);
mainRouter.use('/users', usersRouter);

module.exports = mainRouter;