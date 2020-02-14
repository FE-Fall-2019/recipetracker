export const APP_LOAD = 'App_Load';
export const ADD_RECIPE = 'Add_Recipe';
export const ADD_INGREDIENT = 'Add_Ingredient';
export const RECIPE_LOAD = 'Recipe_Load';

export function recipeLoad(ingredients, id) {
    return {
        type: RECIPE_LOAD,
        payload: {
            ingredientList: ingredients,
            recipeId: id
        }
    }
}

export function appLoad(recipes) {
    return {
        type: APP_LOAD,
        payload: recipes
    }
}

export function addRecipe(recipe) {
    return {
        type: ADD_RECIPE,
        payload: recipe
    }
}

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}