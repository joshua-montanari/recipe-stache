const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe');

// @route POST /recipes
// @desc Creates new recipe
// @access Public
router.post('/', (req, res) => {

    const { recipeName, recipeSteps } = req.body;

    const newRecipe = new Recipe({
        recipeName: recipeName,
        recipeSteps: recipeSteps,
    });
    newRecipe.save()
        .then(recipe => res.status(201).json(recipe))
        .catch(err => res.status(404).json(err));
});

// @route GET /recipes
// @desc Returns all recipes
// @access Public
router.get('/', (req, res) => {
    Recipe.find()
        .then(recipes => res.status(200).json(recipes))
        .catch(err => res.status(404).json(err));
});

// @route GET /recipes/:id
// @desc Returns recipe specified by id
// @access Public
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            if(recipe === null) { return res.status(404).json({error: 'Could not find recipe!'}) }
            return res.status(200).json(recipe);
        })
        .catch(err => res.status(404).json(err));
});

// @route PUT /recipes/:id
// @desc Updates recipe specified by id
// @access Public
router.put('/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, useFindAndModify: false})
        .then(recipe => {
            if(recipe === null) { return res.status(404).json({error: 'Could not locate recipe to update!'}) }
            return res.status(201).json(recipe);
        })
        .catch(err => res.status(404).json(err));
});

// @route DELETE /recipes/:id
// @desc Deletes recipe specified by id
// @access Public
router.delete('/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(recipe => {
            if(recipe === null) { return res.status(404).json({ error: 'Could not locate recipe to delete!'}) }
            return res.status(201).json(recipe);
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;

