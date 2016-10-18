import { combineReducers } from 'redux';

import info from './accountInfoReducer';
import tickets from './accountTicketReducer'
import orders from './accountOrderReducer'


export default accountReducer = combineReducers({
  info,
  tickets,
  orders
});
