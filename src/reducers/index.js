import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import category from './category';

export default combineReducers({
  auth, post, category,
});
