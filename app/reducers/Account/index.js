import { combineReducers } from 'redux';

import info from './accountInfoReducer';
import Pay from './accountPayReducer';
import tickets from './accountTicketReducer'
import orders from './accountOrderReducer'



export default accountReducer = combineReducers({
  info,
  Pay,
  tickets,
  orders
});
