import * as actionTypes from "../actions/actionTypes";

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
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1, //ES6 Syntax to update certain properties in an object
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients:
          //To get the right order(not alphabetically sort based on ingredient's name) of the ingredients display instead of using ingredients: ingredients
          {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
          },
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
