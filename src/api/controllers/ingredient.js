const Ingredient = require('../models/Ingredient');
const { deleteFile } = require('../../utils/deleteFile');

const getIngredients = async (req, res, next) => {
    try {
        const ingredients = await Ingredient.find();
        return res.status(200).json(ingredients);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando los ingredientes');
    }
};

const postIngredient = async (req, res, next) => {
    try {
        const newIngredient = new Ingredient(req.body);

        if (req.file) {
            newIngredient.img = req.file.path;
        }

        const savedNewIngredient = await newIngredient.save();
        return res.status(201).json(savedNewIngredient);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error creando el ingrediente');
    }
};

const updateIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newIngredient = new Ingredient(req.body);
        newIngredient._id = id;

        if (req.file) {
            newIngredient.img = req.file.path;
            const oldIngredient = await Ingredient.findById(id);
            deleteFile(oldIngredient.img);
        }

        const updatedIngredient = await Ingredient.findByIdAndUpdate(id, newIngredient, { new: true });
        return res.status(201).json(updatedIngredient);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error modificando el ingrediente');
    }
};

const deleteIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedIngredient = await Ingredient.findByIdAndDelete(id);
        deleteFile(deletedIngredient.img);
        return res.status(200).json(deletedIngredient);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error eliminando el ingrediente');
    }
}

module.exports = { getIngredients, postIngredient, updateIngredient, deleteIngredient };