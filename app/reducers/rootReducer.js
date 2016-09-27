import { combineReducers } from 'redux';
import HotList from './hotListReducer';
import HotIntro from './hotIntroReducer';
import CityList from './cityListReducer'
import DailyList from './dailyListReducer';
import HotDayInfo from './hotDayInfoReducer';
import MatchSetting from './matchSettingReducer';
import RegGetSmsCode from './regGetSmsCodeReducer';
import RegInputSmsCode from './regInputSmsCodeReducer';


export default rootReducer = combineReducers({
  CityList,
  HotList,
  HotIntro,
  DailyList,
  HotDayInfo,
  MatchSetting,
  RegGetSmsCode,
  RegInputSmsCode,
});
