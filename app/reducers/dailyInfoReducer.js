import * as types from '../actions/actionTypes';


const initialState = {
    dailyInfoList: [],
    isLoading: true,
};

let dailyInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DAILY_INFO_LIST:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case types.RECEIVE_DAILY_INFO_LIST:
      return Object.assign({}, state, {
        dailyInfoList: action.dailyInfoList,
        isLoading: false,
      })
    case types.RESET_DAILY_INFO_LIST:
      return initialState;
    default:
      return state;
  }
}


export default dailyInfo;
