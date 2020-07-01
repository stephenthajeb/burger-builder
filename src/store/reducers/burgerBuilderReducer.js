import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";

const INGREDIENT_PRICES = {
  salad: 4000,
  meat: 8000,
  bacon: 10000,
  cheese: 3000,
};

const initialState = {
  ingredients: null,
  totalPrice: 3000,
  error: false,
};

//Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const newIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      }; //ES6 Syntax to update certain properties in an object
      const updatedIngredients1 = updatedObject(
        state.ingredients,
        newIngredient
      );
      const updatedState1 = {
        ingredients: updatedIngredients1,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updatedObject(state, updatedState1);
    case actionTypes.REMOVE_INGREDIENT:
      const removeIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngredients2 = updatedObject(
        state.ingredients,
        removeIngredient
      );
      const updatedState2 = {
        ingredients: updatedIngredients2,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
      return updatedObject(state, updatedState2);

    case actionTypes.SET_INGREDIENTS:
      const fetchIngredients = {
          //To get the right order(not alphabetically sort based on ingredient's name) of the ingredients display instead of using ingredients: ingredients
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        updatedIngredients = updatedObject(state.ingredients, fetchIngredients);
      const updatedState3 = {
        ingredients: updatedIngredients,
        error: false,
        totalPrice: 3000,
      };
      return updatedObject(state, updatedState3);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updatedObject(state, { error: true });
    default:
      return state;
  }
};
