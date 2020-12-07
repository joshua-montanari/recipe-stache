import React from 'react';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const Ingredient = ({ingredient, ingredients, setIngredients}) => {

    const handleDelete = () => {
        const newIngredients = [...ingredients]
        const index = newIngredients.indexOf(ingredient);
        if(index !== -1) {
            newIngredients.splice(index, 1);
            setIngredients(newIngredients);
        }
    }

    return (
        <div>
            <Box m={1}>
                <Chip 
                    label={ingredient}
                    onDelete={handleDelete}
                />
            </Box>
        </div>
    )
}

export default Ingredient;
