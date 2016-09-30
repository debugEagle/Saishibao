import * as types from '../actions/actionTypes';

const initialState = {
  hotList: [],
  isLoading: true,
  isLoadMore: false,
  count: 0,
};

let hotList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HOT_LIST:
      return Object.assign({}, state, {
        isLoadMore: action.isLoadMore,
        isLoading: action.isLoading,
      })
    case types.RECEIVE_HOT_LIST:
      return Object.assign({}, state, {
        hotList: state.isLoadMore ? state.hotList.concat(action.hotList) : action.hotList,
        count: action.count,
        isLoading: false,
      })
    default:
      return state;
  }
}


export default hotList;
