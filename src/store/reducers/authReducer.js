import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updatedObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      const updatedState = {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
      return updatedObject(state, updatedState);
    case actionTypes.AUTH_FAIL:
      return updatedObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updatedObject(state, { token: null, userId: null });
    default:
      return state;
  }
};
