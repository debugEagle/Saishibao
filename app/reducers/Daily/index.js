import { combineReducers } from 'redux';

import CityList from './cityListReducer'
import DailyList from './dailyListReducer';
import DailyInfo from './dailyInfoReducer';
import DailyResult from './dailyResultReducer';


export default dailyReducer = combineReducers({
  CityList,
  DailyList,
  DailyInfo,
  DailyResult,
});
