import * as api from '../api';

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGOUT = 'auth/LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userInfo) => ({
  type: LOGIN_SUCCESS,
  payload: {
    userInfo,
  },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginThunk = (email, password) => (dispatch) => {
  dispatch(loginRequest());

  return api.login(email, password).then(
    (result) => {
      if (result.data) {
        dispatch(loginSuccess(result.data));
        return true;
      }
      dispatch(loginFailure());
      return false;
    },
  ).catch((error) => {
    console.log(error);
    dispatch(loginFailure());
  });
};

const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case LOGIN_FAILURE: case LOGOUT:
      return {
        isAuthenticated: false,
        userInfo: null,
      };
    default:
      return state;
  }
};
