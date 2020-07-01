import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchase: false,
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updatedObject(state, { purchase: false });
    case actionTypes.PURCHASE_BURGER_START:
      return updatedObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      const updatedState = {
        loading: false,
        purchase: true,
        orders: state.orders.concat(newOrder),
      };
      return updatedObject(state, updatedState);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updatedObject(state, { loading: false });
    case actionTypes.FETCH_ORDER_START:
      return updatedObject(state, { loading: true });
    case actionTypes.FETCH_ORDER_FAIL:
      return updatedObject(state, { loading: false });
    case actionTypes.FETCH_ORDER_SUCCESS:
      return updatedObject(state, {
        ...state,
        orders: action.orders,
        loading: false,
      });
    default:
      return state;
  }
};
