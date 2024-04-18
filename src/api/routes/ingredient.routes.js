const express = require('express');
const ingredientsRouter = express.Router();
const { isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { getIngredients, postIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredient');

ingredientsRouter.get('/', getIngredients);

ingredientsRouter.post('/', isAdmin, upload.single('img'), postIngredient);

ingredientsRouter.put('/:id', isAdmin, upload.single('img'), updateIngredient);

ingredientsRouter.delete('/:id', isAdmin, deleteIngredient);

module.exports = ingredientsRouter;