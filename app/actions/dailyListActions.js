import * as types from './actionTypes';
import { request } from '../common/utils.js'



import {
  NativeModules,
} from 'react-native'

const httpx = NativeModules.httpx;

let fetchDailies = (city,args) => {
  let oArguments = {
    start: true,
    offset: 0,
    limit: 15
  }
  if (!args.start) {
    oArguments = Object.assign({}, oArguments, args)
  }
  let url = 'https://www.91buyin.com/casino?country=中国&city=' + city + '&offset=' + oArguments.offset + '&limit=' + oArguments.limit;
  url = encodeURI(url);
  let casinos = [];
  let count = 0;

  return dispatch => {
    dispatch(fetchDailyList(oArguments.start, city));
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


let fetchDailyList = (start, city) => {
  return {
    type: types.FETCH_DAILY_LIST,
    start: start,
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
