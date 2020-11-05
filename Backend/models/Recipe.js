const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true,
    },
    recipeSteps: {
        type: String,
        required: true,
    },
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);