const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);