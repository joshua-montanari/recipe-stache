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
        type: [String],
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);