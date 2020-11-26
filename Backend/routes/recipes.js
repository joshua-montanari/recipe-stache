const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe');
const User = require('../models/user.model');
const upload = require('../middleware/upload');

// This will check for valid user
const checkIfValidUser = async (id) => {
    const user = await User.findById(id); // this will return null if no user
    if(!user) { throw new Error('No user found!') }
}

router.post('/image', upload.single('file'), async (req, res) => {
    return res.json({file: req.file});
});

// @route POST /recipes
// @desc Creates new recipe
// @access Public TODO: make private
router.post('/', async (req, res) => {

    const { name, steps, category, ingredients, createdBy } = req.body;

    if(!name || !steps || !category || !Array.isArray(ingredients) || !ingredients.length || !createdBy) {
        return res.status(400).json({error: 'Please fill in all required fields!'});
    }

    try {
        await checkIfValidUser(createdBy);
    } catch(e) {
        return res.status(400).json({error: e.message});
    }

    const newRecipe = new Recipe({
        name,
        steps,
        category,
        ingredients,
        createdBy
    });
    newRecipe.save()
        .then(recipe => res.status(201).json(recipe))
        .catch(err => res.status(400).json(err.message));
});

// @route GET /recipes
// @desc Returns all recipes
// @access Public
router.get('/', async (req, res) => {
    Recipe.find()
        .then(recipes => res.status(200).json(recipes))
        .catch(err => res.status(400).json(err.message));
});

// @route GET /recipes/:id
// @desc Returns recipe specified by id
// @access Public
router.get('/:id', async (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            if(recipe === null) { return res.status(404).json({error: 'Could not find recipe!'}) }
            return res.status(200).json(recipe);
        })
        .catch(err => res.status(400).json(err.message));
});

// @route GET /recipes/user/:id
// @desc Returns recipes created by specified user id
// @access Public
router.get('/user/:id', async (req, res) => {

    const { id } = req.params;
    
    try {
        await checkIfValidUser(id);
    } catch(e) {
        return res.status(400).json({error: e.message});
    }

    Recipe.find({createdBy: id})
        .then(recipes => {
            if(!recipes.length) { return res.status(404).json({error: 'Could not find recipe!'}) }
            return res.status(200).json(recipes);
        })
        .catch(err => res.status(400).json(err.message));
});

// @route PUT /recipes/:id
// @desc Updates recipe specified by id
// @access Public TODO: make private
router.put('/:id', async (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, useFindAndModify: false})
        .then(recipe => {
            if(recipe === null) { return res.status(404).json({error: 'Could not locate recipe to update!'}) }
            return res.status(200).json(recipe);
        })
        .catch(err => res.status(400).json(err.message));
});

// @route DELETE /recipes/:id
// @desc Deletes recipe specified by id
// @access Public TODO: make private
router.delete('/:id', async (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(recipe => {
            if(recipe === null) { return res.status(404).json({ error: 'Could not locate recipe to delete!'}) }
            return res.status(200).json(recipe);
        })
        .catch(err => res.status(400).json(err.message));
});

module.exports = router;

