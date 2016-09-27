import * as types from './actionTypes';
import { request } from '../common/utils.js';

let fetchCities = () => {
  let url = 'https://www.91buyin.com/city?country=中国'
  url = encodeURI(url);
  let cityList = [];
  return dispatch => {
    dispatch(fetchCityList());
    request(url).then((json) => {
      try {
        let {
          code,
          value: aCity,
        } = json;
        if (code === '0') {
          cityList = aCity;
        }
        dispatch(receiveCityList(cityList));
      } catch (e) {
        console.log(e.name)
      }
    });
  };
}

let fetchCityList = () => {
  return {
    type: types.FETCH_CITY_LIST,
  }
}

let receiveCityList = (cityList) => {
  return {
    type: types.RECEIVE_CITY_LIST,
    cityList: cityList
  }
}

export { fetchCities }
