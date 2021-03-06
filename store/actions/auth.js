import { API_KEY } from "../../firebase-key";
import { AsyncStorage } from "react-native";

let timer;

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";
export const SET_DID_TRY_AUTO_LOG_IN = "SET_DID_TRY_AUTO_LOG_IN";

export const setDidTryAutoLogin = () => {
  return {
    type: SET_DID_TRY_AUTO_LOG_IN,
  };
};

export const authenticate = (userId, token, expirationDate) => {
  return (dispatch) => {
    dispatch(setLogOutTimer(expirationDate));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;

      let message = "Something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = "This email address is already registered!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    // This creates a Date object of the "future" taking the current time plus the time it takes for the token to expire.
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDataLocally(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;

      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email address is not currently registered!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    // This creates a Date object of the "future" taking the current time plus the time it takes for the token to expire.
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDataLocally(resData.idToken, resData.localId, expirationDate);
  };
};

export const logOut = () => {
  // When logging out we remove any set timer and the local data.
  clearLogOutTimer();
  AsyncStorage.removeItem("userData");

  return {
    type: LOG_OUT,
  };
};

const setLogOutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};

const clearLogOutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataLocally = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expirationDate: expirationDate.toISOString(),
    })
  );
};
