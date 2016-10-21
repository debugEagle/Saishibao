import * as types from '../../actions/actionTypes';

import {AlertIOS} from 'react-native'

const initialState = {
  matchResult: {},
  isLoading: true
};

let matchResult = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MATCH_RESULT:
      return Object.assign({}, state, {
        isLoading: true,
        matchResult: {},
      })
    case types.RECEIVE_MATCH_RESULT:
      return Object.assign({}, state, {
        matchResult: action.matchResult,
        isLoading: false,
      })
    case types.RESET_MATCH_RESULT:
      return initialState;
    default:
      return state;
  }
}

export default matchResult;
