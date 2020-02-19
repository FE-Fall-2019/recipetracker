import { combineReducers } from 'redux';
import recipes from './recipes/recipeReducer';
import user from './user/userReducer';

export default combineReducers({
    recipes,
    user
})