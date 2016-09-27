import * as types from '../actions/actionTypes';

const initialState = {
    casinos: [],
    isLoading: false,
    currentCity: '北京',
    //显示城市View
    showCityView: false,

};

let dailyList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DAILY_LIST:
      return Object.assign({}, state, {
        isLoading: true,
        currentCity: action.selectCity
      })
    case types.RECEIVE_DAILY_LIST:
      return Object.assign({}, state, {
        casinos: action.dailyList.casinos,
        isLoading: false,
      })
    case types.CHANGE_DAILY_CITY_SHOW_STATUS:
      return Object.assign({}, state, {
        showCityView: !state.showCityView,
      })
    default:
      return state;
  }
}


export default dailyList;
