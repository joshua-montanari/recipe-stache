import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RECIPE_URL = 'http://localhost:5000/recipes';

const AllRecipes = () => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(RECIPE_URL);
                setRecipes(response.data);
                setLoading(false);
            } catch(e) {
                // snackbar error
            }
        }

        fetchRecipes();

    }, []);
    
    return (
        <>
            {loading ? <p>Loading</p> :
            <>
                {recipes.map(recipe => {
                    return(
                        <>
                            <p>{recipe.name}</p>
                            <p>Category: {recipe.category}</p>
                            <p>{recipe.steps}</p> {/*Need to convert to draftjs format and then html*/}
                            {recipe.ingredients.map(ingredient => {
                                return(<ul>
                                    <li>{ingredient}</li>
                                </ul>)
                            })}
                        </>
                    );
                })}
            </>
            }
        </>
    );
}

export default AllRecipes;
