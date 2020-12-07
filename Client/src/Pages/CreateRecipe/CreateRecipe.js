import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';
import axios from 'axios';

import IngredientList from '../../Components/Ingredients/IngredientList';
import RecipeEditor from '../../Components/Editor/RecipeEditor';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    padding: theme.spacing(4),
    formDiv: {
        padding: theme.spacing(4)
    },
    categoryDropdown: {
        minWidth: '180px'
    }
}));

const CreateRecipe = () => {

    const classes = useStyles();

    const [recipeName, setRecipeName] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [category, setCategory] = useState('');
    const [ingredientText, setIngredientText] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');
    const [resStatus, setResStatus] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');

    const addIngredient = () => {
        if(!ingredientText.length) { return; }
        setIngredients([...ingredients, ingredientText]);
        setIngredientText('');
    }

    const clearForm = () => {
        setRecipeName('');
        setRecipeSteps('');
        setCategory('');
        setIngredientText('');
        setIngredients([]);
        setImage('');
        setFileName('');
    }

    const submitForm = async () => {

        if(!recipeName || !recipeSteps || !category || !ingredients.length) { return; }

        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('steps', recipeSteps);
        formData.append('category', category);
        ingredients.forEach(ingredient => formData.append('ingredients', ingredient));
        formData.append('createdBy', localStorage.getItem('user-id'));
        formData.append('file', image[0]);

        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': localStorage.getItem('auth-token'),
        }

        try{
            const response = await axios.post('http://localhost:5000/recipes', formData, { headers: headers });

            setResStatus(response.status);
            setAlertMessage('Successfully created recipe!');

            clearForm();
        } catch(e) {
            setResStatus(e.response.status);
            setAlertMessage(e.response.data.error)
        }
    }   

    if(!localStorage.getItem('user-id')) { return(<p>Unauthorized</p>) }

    return (
        <Container>

            {resStatus !== 0 ? <AlertMessage severity={resStatus === 201 ? 'success' : 'error'} message={alertMessage} /> : <></> }

            <Box mb={1} />
            <Paper className={classes.root}>
                <div className={classes.formDiv}>
                    <Typography variant="h3" align="center">Create New Recipe</Typography>
                    <form>
                        <TextField 
                            fullWidth
                            margin="dense"
                            id="recipe-name" 
                            label="Recipe Name" 
                            variant="filled" 
                            value={recipeName} 
                            onChange={e => setRecipeName(e.target.value)} 
                        />
                        <TextField 
                            fullWidth 
                            margin="dense" 
                            id="recipe-steps" 
                            label="Recipe Steps" 
                            variant="filled" 
                            multiline 
                            rows={4} 
                            value={recipeSteps} 
                            onChange={e => setRecipeSteps(e.target.value)} 
                        />
                        {/* TODO: Add Markdown editor */}
                        {/* <RecipeEditor recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} /> */}
                        <FormControl variant="filled">
                            <InputLabel id="category-label">Recipe Category</InputLabel>
                            <Select
                            className={classes.categoryDropdown}
                            fullWidth
                            labelId="category-label"
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
                        </FormControl>

                        <Typography variant="h6">Ingredients:</Typography>

                        <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
                        <FormControl>
                        <TextField 
                            id="ingredients" 
                            label="Add Ingredient" 
                            variant="filled" 
                            value={ingredientText} 
                            onChange={e => setIngredientText(e.target.value)} 
                            InputProps={{
                                endAdornment:
                                <InputAdornment position="end">
                                <IconButton
                                    onClick={addIngredient}
                                    edge="end"
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                </InputAdornment>
                            }}
                        />
                        </FormControl>
                        <br />
                        <Box mt={2} />
                        <FormControl>
                        <input
                            accept="image/*"
                            id="raised-button-file"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={e => {
                                setFileName(e.target.value.split(/(\\|\/)/g).pop())
                                setImage(e.target.files)
                            }}
                        />
                        </FormControl>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="secondary" size="large" component="span">Upload Image</Button>
                        </label>
                        <Typography variant="body2">{fileName}</Typography>
                        <Box mt={2} />
                        <Button fullWidth variant="contained" color="primary" onClick={submitForm}>Submit</Button>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}

export default CreateRecipe;