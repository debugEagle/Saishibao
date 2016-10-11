import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil';

let fetchDailyInfo = (casino_id, match_day, success=()=>{}, error=()=>{}) => {
  let url = 'http://www.91buyin.com/texas/daily/match'
  let params = {
    casino_id,
    match_day
  }
  let dailyInfoList = []
  return dispatch => {
    dispatch(fetchDailyInfoList());
    HTTPUtil.get(url, params).then((json) => {
      try {
        if (json.code === '0') {
          dailyInfoList = json.value.rows
          success();
        }
        dispatch(receiveDailyInfoList(dailyInfoList));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
}

let fetchDailyInfoList = () => {
  return {
    type: types.FETCH_DAILY_INFO_LIST,
  }
}

let receiveDailyInfoList = (dailyInfoList) => {
  return {
    type: types.RECEIVE_DAILY_INFO_LIST,
    dailyInfoList: dailyInfoList,
  }
}

let resetDailyInfoList = () => {
  return {
    type: types.RESET_DAILY_INFO_LIST,
  }
}


export { fetchDailyInfo, resetDailyInfoList }
