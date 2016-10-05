import * as types from './actionTypes';
import { request } from '../common/utils.js';

let fetchDailyInfo = () => {
  let url = 'https://www.91buyin.com/texas/daily/match?casino_id=31&match_day=2016-08-29';
  url = encodeURI(url);
  let dailyInfoList = [];
  return dispatch => {
    dispatch(fetchDailyInfoList());
    request(url).then((json) => {
      try {
        let {
          code,
          value: {
            rows: rows
          }
        } = json;


        if (code === '0') {
          dailyInfoList = rows;
          console.log(rows.length);
          dispatch(receiveDailyInfoList(dailyInfoList));
        }

      } catch (e) {
        console.log(e.name)
      }
    });
  };
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
