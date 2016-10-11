import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

let fetchDailies = (city, args, success=()=>{}, error=()=>{}) => {
  let params = {
    start: true,
    offset: 0,
    limit: 15
  }
  if (!args.start) {
    params = Object.assign({}, params, args)
  }
  let start = params.start
  delete params.start
  params.city = city
  let url = 'http://www.91buyin.com/casino?country=中国'
  let iCount = 0
  let casinos = []

  return dispatch => {
    dispatch(fetchDailyList(start, city));
    HTTPUtil.get(url, params).then((json) => {
      try {
        if (json.code === '0') {
          iCount = json.value.count
          casinos = json.value.rows
          success();
        }
        dispatch(receiveDailyList(iCount,casinos));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
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
