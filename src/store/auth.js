const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

export default function auth(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return {

      };
    case LOGOUT:
      return {

      }
    default:
      return state;
  }
};
