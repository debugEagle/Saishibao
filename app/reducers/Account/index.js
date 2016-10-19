import { combineReducers } from 'redux';

import info from './accountInfoReducer';
import Pay from './accountPayReducer';


export default accountReducer = combineReducers({
  info,
  Pay,
});
