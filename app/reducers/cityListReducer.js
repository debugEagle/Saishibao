import * as types from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    cities: []
};

let cityList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CITY_LIST:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case types.RECEIVE_CITY_LIST:
      return Object.assign({}, state, {
        cities: action.cityList,
        isLoading: false,
      })
    default:
      return state;
  }
}


export default cityList;
