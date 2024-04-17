const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
    {
        name: { type: String, required: true },
        img: { type: String, required: false },
        category: { type: String, required: true },
        nutritional_info: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'ingredients'
    }
);

const Ingredient = mongoose.model('ingredients', ingredientSchema, 'ingredients');

module.exports = Ingredient;