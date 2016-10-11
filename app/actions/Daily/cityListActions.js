import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil';

let fetchCities = (success=()=>{}, error=()=>{}) => {
  let url = 'http://www.91buyin.com/city?country=中国'
  let city = []
  return dispatch => {
    dispatch(fetchCityList());
    HTTPUtil.get(url).then((json) => {
      try {
        if (json.code === '0') {
          success();
          city = json.value.rows
        }
        dispatch(receiveCityList(city));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
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
