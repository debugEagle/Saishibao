import * as types from '../actionTypes';
import { request } from '../../common/utils.js'

import { NativeModules } from 'react-native'

const httpx = NativeModules.httpx;

let fetchScheduleDetail = (id) => {

  let Matches = {}
  let url = 'https://www.91buyin.com/texas/big/serie/match/' + id;

  return dispatch => {
    dispatch(fetchScheduleDetailInfo());

    request(url).then((json) => {
      try {
        let {
          code,
          value: {
            rows: matches
          }
        } = json;
        if (code === '0') {
          Matches = matches
          dispatch(receiveScheduleDetail(Matches));
        }
      } catch (e) {
        console.log(e.name)
      }
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
