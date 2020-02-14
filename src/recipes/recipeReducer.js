import { ADD_RECIPE, ADD_INGREDIENT, RECIPE_LOAD, APP_LOAD } from './recipeActions';

const initialState = {
    recipes: []
}

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOAD: {
            return {
                recipes: action.payload
            }
        }
        case ADD_RECIPE: {
            let recipesList = state.recipes;
            recipesList.push(action.payload);
            return {
                recipes: recipesList
            }
        }
        case ADD_INGREDIENT: {
            let recipe = state.recipes.find(r => r.id == action.payload.recipeId);
            recipe.ingredients = [...recipe.ingredients, action.payload]
            return {
                recipes: [...state.recipes]
            }
        }
        case RECIPE_LOAD: {
            let recipe = state.recipes.find(r => r.id == action.payload.recipeId);
            recipe.ingredients = action.payload.ingredientList;
            return {
                recipes: [...state.recipes]
            }
        }
        default: {
            return state;
        }
    }
}

export default recipes;