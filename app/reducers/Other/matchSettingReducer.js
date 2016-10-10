import * as types from '../../actions/actionTypes';

import {AlertIOS} from 'react-native'

const initialState = {
  matchSetting: {},
  isLoading: true
};

let matchSetting = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MATCH_SETTING:
      return Object.assign({}, state, {isLoading: true})
    case types.RECEIVE_MATCH_SETTING:
      return Object.assign({}, state, {
        matchSetting: action.matchSetting,
        isLoading: false
      })
    case types.RESET_MATCH_SETTING:
      return initialState;
    default:
      return state;
  }
}

export default matchSetting;
