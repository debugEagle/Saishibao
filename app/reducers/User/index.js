import { combineReducers } from 'redux';

import RegGetSmsCode from './regGetSmsCodeReducer';
import RegInputSmsCode from './regInputSmsCodeReducer';
import TimerElse from './timerElseReducer';
import RegPwd from './regPwdReducer';
import UserLogin from './userLoginReducer'

export default userReducer = combineReducers({
  RegGetSmsCode,
  RegInputSmsCode,
  TimerElse,
  RegPwd,
  UserLogin
});
