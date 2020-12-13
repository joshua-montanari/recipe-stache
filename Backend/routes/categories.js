const { createHash } = require('crypto');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Category = require('../models/Category');

// @route GET /categories
// @desc Returns all recipe categories
// @access Public
router.get('/', async (req, res) => {
    Category.find()
        .then(categories => res.status(200).json(categories))
        .catch(err => res.status(400).json(err.message));
});

// @route GET /categories/:id
// @desc Returns recipe categorie by id
// @access Public
router.get('/:id', async (req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category ? res.status(200).json(category) : res.status(400).json({error: "No category found!"});
        })
        .catch(err => res.status(400).json(err.message));
});

// @route POST /categories
// @desc Creates new recipe category
// @access Private
router.post('/', auth, async (req, res) => {
    if(!req.body.name) { return res.status(400).json({error: 'Please provide category name'}) }

    const newCategory = new Category({name: req.body.name});

    newCategory.save()
        .then(category => res.status(201).json(category))
        .catch(err => res.status(400).json(err.message));
});

// @route PUT /categories
// @desc Updates recipe category
// @access Private
router.put('/:id', auth, async (req, res) => {
    if(!req.body.name) { return res.status(400).json({error: 'Please provide category name'}) }

    Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
        .then(category => {
            category ? res.status(200).json(category) : res.status(400).json({error: "No category found to update!"});
        })
        .catch(err => res.status(400).json(err.message));
});

// @route DELETE /categories
// @desc Deletes recipe category
// @access Private
router.delete('/:id', auth, async (req, res) => {

    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            category ? res.status(200).json(category) : res.status(400).json({error: "No category found to delete!"});
        })
        .catch(err => res.status(400).json(err.message));
});

module.exports = router;