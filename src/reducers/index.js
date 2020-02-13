import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import category from './category';
import popup from './popup';

export default combineReducers({
  auth, post, category, popup,
});
