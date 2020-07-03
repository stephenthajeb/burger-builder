import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("session");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authenticate = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    //Sign up url
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdgmycfPbO7aMi4iU1iJfuINCvzxIwwa8";
    if (!isSignup) {
      //Sign in url
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdgmycfPbO7aMi4iU1iJfuINCvzxIwwa8";
    }

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        const sessionData = {
          token: res.data.idToken,
          userId: res.data.localId,
          expirationDate: new Date(
            new Date().getTime() + res.data.expiresIn * 1000
          ),
        };
        localStorage.setItem("session", JSON.stringify(sessionData));
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const session = localStorage.getItem("session");
    if (session) {
      const sessionData = JSON.parse(localStorage.getItem("session"));
      const expirationDate = new Date(sessionData.expirationDate);
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(sessionData.token, sessionData.userId));
        dispatch(checkAuthTimeout((expirationDate - new Date()) / 1000));
      }
    }
  };
};
