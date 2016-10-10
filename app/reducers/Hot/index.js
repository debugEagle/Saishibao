import { combineReducers } from 'redux';

import HotList from './hotListReducer';
import HotIntro from './hotIntroReducer';
import HotDayInfo from './hotDayInfoReducer';

export default hotReducer = combineReducers({
  HotList,
  HotIntro,
  HotDayInfo,
});
