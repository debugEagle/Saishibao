import * as types from '../actions/actionTypes';

// stateCode:     0:还未加载  1:上拉刷新中  2:还有数据可加载  3:全部加载完毕
const initialState = {
    casinos: [],
    isLoading: false,
    currentCity: '北京',
    showCityView: false,
    stateCode: 0,
};

let dailyList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DAILY_LIST:
      return Object.assign({}, state, {
        isLoading: true,
        currentCity: action.selectCity,
        stateCode: action.typeCode
      })
    case types.RECEIVE_DAILY_LIST:
      const stateCode = (state.casinos.length + action.casinos.length) < action.count ? 2 : 3
      return Object.assign({}, state, {
        casinos: [].concat(state.casinos, action.casinos),
        stateCode: stateCode,
        isLoading: false
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
