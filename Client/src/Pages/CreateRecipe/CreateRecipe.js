import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import IngredientList from '../../Components/Ingredients/IngredientList';
import RecipeEditor from '../../Components/Editor/RecipeEditor';

const CreateRecipe = () => {

    const [recipeName, setRecipeName] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [category, setCategory] = useState('');
    const [ingredientText, setIngredientText] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');

    const addIngredient = () => {
        if(!ingredientText.length) { return; }
        setIngredients([...ingredients, ingredientText]);
        setIngredientText('');
    }

    const submitForm = async () => {

        if(!recipeName || !recipeSteps || !category || !ingredients.length) { return; }


        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('steps', recipeSteps);
        formData.append('category', category);
        formData.append('ingredients', ingredients);
        formData.append('createdBy', localStorage.getItem('user-id'));
        formData.append('file', image[0]);


        // const newRecipe = {
        //     name: recipeName,
        //     steps: recipeSteps,
        //     category: category,
        //     ingredients: ingredients,
        //     createdBy: localStorage.getItem('user-id'),
        //     file: image
        // }

        console.log(localStorage.getItem('auth-token'));

        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': localStorage.getItem('auth-token'),
        }

        try{
            const response = await axios.post('http://localhost:5000/recipes', formData, headers)
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

                {/* <RecipeEditor recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} /> */}
                
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

                <input
                    accept="image/*"
                    id="raised-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={e => setImage(e.target.files)}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">Upload Image</Button>
                </label>

                <Button variant="contained" color="primary" onClick={submitForm}>Submit</Button>
            </form>
        </Paper>
    );
}

export default CreateRecipe;
