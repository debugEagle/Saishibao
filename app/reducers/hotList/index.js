import * as types from '../../actions/actionTypes';

const initialState = {
  hotList: [],
  status: 'null',
  count: 0,
  hotIntro: {
    intro: [],
    isLoading: true
  },
  hotDayInfo: {
    hotDayList: [],
    hotDayDetailList: [],
    selectedList: [],
    match_day: '',
    isLoading: true,
  }
};

let hotList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HOT_LIST:
      const status = action.start ? 'refreshing' : 'loading'
      return Object.assign({}, state, {
        status: status
      })
    case types.RECEIVE_HOT_LIST:
      let hotList = state.status === 'refreshing' ? [] : state.hotList
      hotList = hotList.concat(action.hotList)
      let s = hotList.length < action.count ? 'loaded' : 'finished'
      return Object.assign({}, state, {
        hotList: hotList,
        count: action.count,
        status: s
      })
    // hotIntro
    case types.FETCH_HOT_INTRO:
      return Object.assign({}, state, {
        hotIntro: Object.assign({}, state.hotIntro, {
          isLoading: true
        }),
      })
    case types.RECEIVE_HOT_INTRO:
      return Object.assign({}, state, {
        hotIntro: Object.assign({}, state.hotIntro, {
          intro: action.intro,
          isLoading: false,
        }),
      })
    case types.RESET_HOT_INTRO:
      return Object.assign({}, state, {
        hotIntro: Object.assign({}, state.hotIntro, initialState.hotIntro),
      })
    // hotDayInfo
    case types.FETCH_HOT_DAY_LIST:
      return Object.assign({}, state, {
        hotDayInfo: Object.assign({}, state.hotDayInfo, {
          isLoading: false,
        })
      })
    case types.RECEIVE_HOT_DAY_LIST:
      return Object.assign({}, state, {
        hotDayInfo: Object.assign({}, state.hotDayInfo, {
          hotDayList: action.hotDayList,
          hotDayDetailList: action.hotDayDetailList,
          isLoading: false,
        })
      })
    case types.FETCH_HOT_DAY_DETAIL:
      let selectedList = [];
      for (let item of state.hotDayInfo.hotDayDetailList) {
        if (action.match_day === item.match_day) {
          selectedList.push(item);
        }
      }
      return Object.assign({}, state, {
        hotDayInfo: Object.assign({}, state.hotDayInfo, {
          selectedList: selectedList
        })
      })
    case types.RESET_HOT_DAY_LIST:
      return Object.assign({}, state, initialState.hotDayInfo)
    default:
      return state;
  }
}

export default hotList;
