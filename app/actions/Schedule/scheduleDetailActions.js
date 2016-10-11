import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

import { NativeModules } from 'react-native'

const httpx = NativeModules.httpx;

let fetchScheduleDetail = (id,success=()=>{},error=()=>{}) => {

  let Matches = {}
  let url = 'http://www.91buyin.com/texas/big/serie/match/' + id;

  return dispatch => {
    dispatch(fetchScheduleDetailInfo());
    HTTPUtil.get(url).then((json) => {
      try {
        let rows = []
        if (json.code === '0') {
          rows = json.value.rows
          success();
        }
        dispatch(receiveScheduleDetail(rows));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
}

let fetchScheduleDetailInfo = () => {
  return {
    type: types.FETCH_SCHEDULE_DETAIL,
  }
}

let receiveScheduleDetail = (matches) => {
  return {
    type: types.RECEIVE_SCHEDULE_DETAIL,
    matches: matches,
  }
}

let resetScheduleDetail = () => {
  return {
    type: types.RESET_SCHEDULE_DETAIL,
  }
}

export {
  fetchScheduleDetail,
  resetScheduleDetail
}
