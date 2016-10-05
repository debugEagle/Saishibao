import * as types from '../actions/actionTypes';

// status:     'loading':上拉加载中  'refreshing':上拉刷新中  'loaded':还有数据可加载  'finished':全部加载完毕
const initialState = {
    casinos: [],
    status: 'null',
    currentCity: '北京',
    showCityView: false,
};

let dailyList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DAILY_LIST:
      const status = action.start ? 'refreshing' : 'loading'
      return Object.assign({}, state, {
        status: status,
        currentCity: action.selectCity,
      })
    case types.RECEIVE_DAILY_LIST:
      let casinos = state.status === 'refreshing' ? [] : state.casinos
      casinos = casinos.concat(action.casinos)
      let s = casinos.length < action.count ? 'loaded' : 'finished'
      return Object.assign({}, state, {
        casinos: casinos,
        status: s,
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
