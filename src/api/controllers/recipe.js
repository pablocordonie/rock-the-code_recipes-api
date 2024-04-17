const Recipe = require('../models/Recipe');

const getRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find().populate('ingredients');
        return res.status(200).json(recipes);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando las recetas');
    }
};

const postRecipe = async (req, res, next) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedNewRecipe = await newRecipe.save();
        return res.status(201).json(savedNewRecipe);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error creando la receta');
    }
};

const updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newRecipe = new Recipe(req.body);
        newRecipe._id = id;

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, newRecipe, { new: true });
        return res.status(201).json(updatedRecipe);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error modificando la receta');
    }
};

const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        return res.status(200).json(deletedRecipe);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error eliminando la receta');
    }
}

module.exports = { getRecipes, postRecipe, updateRecipe, deleteRecipe };