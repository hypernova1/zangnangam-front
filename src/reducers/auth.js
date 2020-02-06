import * as api from '../api';

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGOUT = 'auth/LOGOUT';
const SAVE_USER_SUMMARY = 'auth/SAVE_USER_SUMMARY';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const saveUserSummary = (userSummary) => ({
  type: SAVE_USER_SUMMARY,
  payload: {
    userSummary,
  },
});

export const loginThunk = (email, password) => (dispatch) => {
  dispatch(loginRequest());

  return api.login(email, password)
    .then((res) => res.data)
    .then((data) => {
      if (data.accessToken) {
        const accessToken = data.tokenType + ' ' + data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        dispatch(loginSuccess());
        return true;
      }
      dispatch(loginFailure());
      return false;
    })
    .catch((error) => {
      dispatch(loginFailure());
    });
};

const initialState = {
  isAuthenticated: false,
  userSummary: {
    email: '',
  },
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE: case LOGOUT:
      localStorage.removeItem('accessToken');
      return {
        isAuthenticated: false,
        userSummary: {
          email: '',
        },
      };
    case SAVE_USER_SUMMARY:
      return {
        ...state,
        userSummary: action.payload.userSummary,
      };
    default:
      return state;
  }
};
