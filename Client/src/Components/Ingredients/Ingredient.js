import React from 'react';
import Chip from '@material-ui/core/Chip';

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
            <Chip 
                label={ingredient}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Ingredient;
