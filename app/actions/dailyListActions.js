import * as types from './actionTypes';
import { request } from '../common/utils.js'



import {
  NativeModules,
} from 'react-native'

const httpx = NativeModules.httpx;

let fetchDailies = (city) => {

  let url = 'https://www.91buyin.com/casino?country=中国&city=' + city;
  // let url = 'https://www.91buyin.com/casin';
  url = encodeURI(url);

  let dailies = [];

  return dispatch => {
    dispatch(fetchDailyList(city));
    request(url).then((json) => {
      try {
        let {
          code,
          value: {
            rows: casinos
          },
        } = json;

        if (code === '0') {
          dailies.casinos = casinos;
          dispatch(receiveDailyList(dailies));
        }
      }
      catch (e) {
        console.log(e.name)
      }
    });
  }
}

let changeDailyCityShowStatus = () => {
  return {
    type: types.CHANGE_DAILY_CITY_SHOW_STATUS,

  }
}


let fetchDailyList = (city) => {
  return {
    type: types.FETCH_DAILY_LIST,
    selectCity: city,
  }
}

let receiveDailyList = (dailyList) => {
  // console.log('receiveDailyList  ' + dailyList.casinos);
  return {
    type: types.RECEIVE_DAILY_LIST,
    dailyList: dailyList,

  }
}

export {
  fetchDailies,
  changeDailyCityShowStatus,
}
