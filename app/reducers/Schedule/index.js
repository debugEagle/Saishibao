import { combineReducers } from 'redux';

import ScheduleList from './scheduleListReducer';
import ScheduleDetail from './scheduleDetailReducer'

export default scheduleReducer = combineReducers({
  ScheduleList,
  ScheduleDetail
});
