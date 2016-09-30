import * as types from './actionTypes';
import { request } from '../common/utils.js'



import {
  NativeModules,
} from 'react-native'

const httpx = NativeModules.httpx;

// code: 0:初次加载 1:加载更多
let fetchDailies = (typeCode,city,offset,limit) => {
  let url = 'https://www.91buyin.com/casino?country=中国&city=' + city + '&offset=' + offset + '&limit=' + limit;
  url = encodeURI(url);
  let casinos = [];
  let count = 0;

  return dispatch => {
    dispatch(fetchDailyList(typeCode, city));
    request(url).then((json) => {
      try {
        let {
          code,
          value: {
            count: iCount,
            rows: aCasinos
          },
        } = json;
        if (code === '0') {
          casinos = aCasinos;
          count = iCount;
          dispatch(receiveDailyList(count,casinos));
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


let fetchDailyList = (typeCode, city) => {
  return {
    type: types.FETCH_DAILY_LIST,
    typeCode: typeCode,
    selectCity: city,
  }
}

let receiveDailyList = (count, casinos) => {
  return {
    type: types.RECEIVE_DAILY_LIST,
    count: count,
    casinos: casinos
  }
}

export {
  fetchDailies,
  changeDailyCityShowStatus
}
