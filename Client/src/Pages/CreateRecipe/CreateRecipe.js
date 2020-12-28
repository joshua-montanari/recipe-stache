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

import { convertToRaw } from 'draft-js';

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
            fieldErrors.recipeName = fieldValues.recipeName ? '' : 'This field is required.'
        }
        if('category' in fieldValues) {
            fieldErrors.category = fieldValues.category ? '' : 'Please pick a category.'
        }
        if('ingredients' in fieldValues) {
            fieldErrors.ingredients = fieldValues.ingredients ? '' : 'Please add ingredients.'
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

    const [recipeName, setRecipeName] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [ingredientText, setIngredientText] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');
    const [resStatus, setResStatus] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

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
        setRecipeName('');
        setRecipeSteps('');
        setCategory('');
        setIngredientText('');
        setIngredients([]);
        setImage('');
        setFileName('');
    }

    const submitForm = async () => {

        if(!validate()) { return; }

        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('steps', JSON.stringify(convertToRaw(recipeSteps)));
        formData.append('category', category);
        ingredients.forEach(ingredient => formData.append('ingredients', ingredient));
        formData.append('createdBy', getCookie('userId'));
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

    if(!getCookie('jwt')) { return(<p>Unauthorized</p>) }

    return (
        <Container>

            {resStatus !== 0 ? <AlertMessage severity={resStatus === 201 ? 'success' : 'error'} message={alertMessage} /> : <></> }

            <Box mb={1} />
            <Paper className={classes.root}>
                <div className={classes.formDiv}>
                    <Typography variant="h3" align="center">Create New Recipe</Typography>
                    <form>
                        {/* <TextField 
                            fullWidth
                            margin="dense"
                            id="recipe-name" 
                            label="Recipe Name" 
                            variant="filled" 
                            value={recipeName} 
                            onChange={e => setRecipeName(e.target.value)} 
                        /> */}

                        <Input
                            name="recipeName"
                            label="Recipe Name"
                            value={values.recipeName}
                            onChange={handleInputChange}
                            error={errors.recipeName}
                        />

                        <RichTextEditor setRecipeSteps={setRecipeSteps} />

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
                        <Button fullWidth variant="contained" color="primary" onClick={submitForm}>Submit</Button>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}

export default CreateRecipe;