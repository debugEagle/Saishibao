import * as types from '../actions/actionTypes';

import {
  AlertIOS,
} from 'react-native'




const initialState = {
    hotDayList: [],
    hotDayDetailList: [],
    selectedList: [],
    match_day: '',
    isLoading: true,
};

let hotDayInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HOT_DAY_LIST:
      return Object.assign({}, state, {
        isLoading: false,
      })
    case types.RECEIVE_HOT_DAY_LIST:
      return Object.assign({}, state, {
        hotDayList: action.hotDayList,
        hotDayDetailList: action.hotDayDetailList,
        isLoading: false,
      })
    case types.FETCH_HOT_DAY_DETAIL:
      state.selectedList = [];
      for (let item of state.hotDayDetailList) {
        if (action.match_day === item.match_day) {
          state.selectedList.push(item);
        }
      }
      return Object.assign({}, state, {
        selectedList: state.selectedList,

      })

    case types.RESET_HOT_DAY_LIST:
      return initialState;
    default:
      return state;
  }
}


export default hotDayInfo;
