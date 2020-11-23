import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import IngredientList from '../../Components/Ingredients/IngredientList';

const CreateRecipe = () => {

    const [recipeName, setRecipeName] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [category, setCategory] = useState('');
    const [ingredientText, setIngredientText] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const addIngredient = () => {
        if(!ingredientText.length) { return; }
        setIngredients([...ingredients, ingredientText]);
    }

    const submitForm = async () => {

        if(!recipeName || !recipeSteps || !category || !ingredients.length) { return; }

        const newRecipe = {
            name: recipeName,
            steps: recipeSteps,
            category: category,
            ingredients: ingredients,
            createdBy: localStorage.getItem('user-id'),
        }

        const headers = {
            Accept: 'application/json'
        }

        try{
            const response = await axios.post('http://localhost:5000/recipes', newRecipe, headers)
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }   


    if(!localStorage.getItem('user-id')) { return(<p>Unauthorized</p>) }

    return (
        <Paper>
            <form>
                <TextField id="recipe-name" label="Recipe Name" variant="filled" onChange={e => setRecipeName(e.target.value)} />
                {/* TODO: Add Markdown editor */}
                <TextField id="recipe-steps" label="Recipe Steps" variant="filled" multiline rows={4} onChange={e => setRecipeSteps(e.target.value)} />
                <Select
                labelId="category"
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                label="Category"
                >
                    {/* TODO: Add categories route */}
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Test">
                        Test
                    </MenuItem>
                </Select>
                <IngredientList ingredients={ingredients} setIngredients={setIngredients} />

                <TextField id="ingredients" label="Ingredients" variant="filled" value={ingredientText} onChange={e => setIngredientText(e.target.value)} />

                <Button onClick={addIngredient}>Add</Button>

                <Button variant="contained" color="primary" onClick={submitForm}>Submit</Button>
            </form>
        </Paper>
    );
}

export default CreateRecipe;
