import { combineReducers } from 'redux';
import HotList from './hotListReducer';
import HotIntro from './hotIntroReducer';
import CityList from './cityListReducer'
import DailyList from './dailyListReducer';
import HotDayInfo from './hotDayInfoReducer';
import MatchSetting from './matchSettingReducer';
import RegGetSmsCode from './regGetSmsCodeReducer';
import RegInputSmsCode from './regInputSmsCodeReducer';
import ScheduleList from './scheduleListReducer';
import ScheduleDetail from './scheduleDetailReducer'
import DailyInfo from './dailyInfoReducer';
import TimerElse from './timerElseReducer';
import RegPwd from './regPwdReducer';


export default rootReducer = combineReducers({
  CityList,
  HotList,
  HotIntro,
  DailyList,
  HotDayInfo,
  MatchSetting,
  RegGetSmsCode,
  RegInputSmsCode,
  ScheduleList,
  DailyInfo,
  TimerElse,
  RegPwd,
  ScheduleDetail
});
