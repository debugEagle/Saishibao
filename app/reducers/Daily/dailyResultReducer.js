import * as types from '../../actions/actionTypes';

import {AlertIOS} from 'react-native'

const initialState = {
  matchResult: {},
  isLoading: true
};

let dailyResult = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DAILY_MATCH_RESULT:
      return Object.assign({}, state, {isLoading: true})
    case types.RECEIVE_DAILY_MATCH_RESULT:
      return Object.assign({}, state, {
        matchResult: action.matchResult,
        isLoading: false
      })
    case types.RESET_MATCH_SETTING:
      return initialState;
    default:
      return state;
  }
}

export default dailyResult;
