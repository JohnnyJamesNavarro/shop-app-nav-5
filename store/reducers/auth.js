import {
  AUTHENTICATE,
  LOG_OUT,
  SET_DID_TRY_AUTO_LOG_IN,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DID_TRY_AUTO_LOG_IN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
