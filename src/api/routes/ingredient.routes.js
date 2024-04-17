const express = require('express');
const ingredientsRouter = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getIngredients, postIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredient');

ingredientsRouter.get('/', getIngredients);

ingredientsRouter.post('/', isAuth, postIngredient);

ingredientsRouter.put('/:id', isAdmin, updateIngredient);

ingredientsRouter.delete('/:id', isAdmin, deleteIngredient);

module.exports = ingredientsRouter;