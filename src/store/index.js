import user from './user';
import general from './general';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user,
  general
});

export default rootReducer;
