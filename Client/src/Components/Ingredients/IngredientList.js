import React from 'react';
import Ingredient from './Ingredient';

const IngredientList = ({ingredients, setIngredients}) => {
    
    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <Ingredient 
                    key={index}
                    ingredient={ingredient}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                />
            ))}
        </div>
        
    )
}

export default IngredientList;
