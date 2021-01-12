import React, { useState, useEffect } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import axios from 'axios';

import IngredientList from '../../Components/Ingredients/IngredientList';
import RichTextEditor from '../../Components/RichTextEditor/RichTextEditor';
import Input from '../../Components/Controls/Input';
import AsyncSelect from '../../Components/Controls/AsyncSelect';
import { useForm, Form } from '../../Components/useForm';

import { convertToRaw, convertFromRaw } from 'draft-js';

import getCookie from '../../Util/GetCookie';

const useStyles = makeStyles((theme) => ({
    padding: theme.spacing(4),
    formDiv: {
        padding: theme.spacing(4)
    },
    categoryDropdown: {
        minWidth: '180px'
    }
}));

const initialValues = {
    recipeName: '',
    category: '',
    ingredients: [],
}

const CreateRecipe = () => {

    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let fieldErrors = { ...errors }

        if('recipeName' in fieldValues) {
            fieldErrors.recipeName = fieldValues.recipeName ? '' : 'Please pick a recipe name.'
        }
        if('category' in fieldValues) {
            fieldErrors.category = fieldValues.category ? '' : 'Please pick a category.'
        }
        // if('ingredients' in fieldValues) {
        //     fieldErrors.ingredients = fieldValues.ingredients ? '' : 'Please add ingredients.'
        // }
        if(ingredients.length < 1) {
            setIngredientError({error: true, message: 'Please add ingredients.'});
        }
        else {
            setIngredientError({error: false, message: ''});
        }
        if(!recipeSteps.hasText()) {
            setRecipeStepsError(true);
        }
        else {
            setRecipeStepsError(false);
        }


        setErrors({ ...fieldErrors });

        if(fieldValues === values) {
            return Object.values(fieldErrors).every(x => x === '');
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);

    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeStepsError, setRecipeStepsError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [ingredientText, setIngredientText] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientError, setIngredientError] = useState({error: false, message: ''});
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');
    const [resStatus, setResStatus] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {

        const fetchCategories = async () => {

            try {
                const response = await axios.get('http://localhost:5000/categories');

                console.log(response);
                const categories = response.data;
                console.log(categories);
                setCategories(categories.map(category => { return {name: category.name, id: category._id} }));

            } catch(e) {

            }
        }
        fetchCategories();

    }, [])

    const addIngredient = () => {
        if(!ingredientText.length) { return; }
        setIngredients([...ingredients, ingredientText]);
        setIngredientText('');
    }

    const clearForm = () => {
        setRecipeSteps('');
        setIngredientText('');
        setIngredients([]);
        setImage('');
        setFileName('');
    }

    const submitForm = async e => {

        e.preventDefault();

        if(!validate()) { return; }

        const formData = new FormData();
        console.log(values);
        formData.append('name', values.recipeName);
        formData.append('steps', JSON.stringify(convertToRaw(recipeSteps)));
        formData.append('category', values.category);
        ingredients.forEach(ingredient => formData.append('ingredients', ingredient));
        formData.append('createdBy', getCookie('userId'));
        formData.append('file', image[0]);

        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': localStorage.getItem('auth-token'),
        }

        console.log(formData);

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

    if(!getCookie('jwt')) { return(<p>Unauthorized</p>) }

    return (
        <Container>

            {resStatus !== 0 ? <AlertMessage severity={resStatus === 201 ? 'success' : 'error'} message={alertMessage} /> : <></> }

            <Box mb={1} />
            <Paper className={classes.root}>
                <div className={classes.formDiv}>
                    <Typography variant="h3" align="center">Create New Recipe</Typography>
                    <form onSubmit={e => submitForm(e)}>
                        <Input
                            name="recipeName"
                            label="Recipe Name"
                            value={values.recipeName}
                            onChange={handleInputChange}
                            error={errors.recipeName}
                        />

                        <RichTextEditor setRecipeSteps={setRecipeSteps}  recipeStepsError={recipeStepsError} />

                        <AsyncSelect
                            name="category"
                            label="Categories"
                            value={values.category}
                            error={errors.category}
                            onChange={handleInputChange}
                            options={categories}
                        />

                        <Typography variant="h6">Ingredients:</Typography>

                        <IngredientList ingredients={ingredients} setIngredients={setIngredients} />

                        <TextField 
                            id="ingredients" 
                            label="Add Ingredient" 
                            variant="filled" 
                            value={ingredientText} 
                            onChange={e => setIngredientText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                   addIngredient();
                                }
                             }}
                            error={ingredientError.error}
                            helperText={ingredientError.message}
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
                        <Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}

export default CreateRecipe;