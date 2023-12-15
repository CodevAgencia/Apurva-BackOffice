import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import users from './app/usuarioSlice';
import blogs from './app/blogSlice';
import texts from './app/textosSlice';
import categories from './app/blogCategoriesSlice';
import suscripciones from './app/suscriptionSlice';
import modules from './app/moduleSubscriptionSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    fuse,
    i18n,
    ...asyncReducers,
    users,
    blogs,
    texts,
    categories,
    suscripciones,
    modules,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
