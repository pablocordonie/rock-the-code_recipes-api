const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
    {
        name: { type: String, required: true },
        img: { type: String, required: false },
        origin: { type: String, required: true },
        time: { type: String, required: true },
        ingredients: [{ type: Schema.Types.ObjectId, ref: 'ingredients' }]
    },
    {
        timestamps: true,
        collection: 'recipes'
    }
);

const Recipe = mongoose.model('recipes', recipeSchema, 'recipes');

module.exports = Recipe;