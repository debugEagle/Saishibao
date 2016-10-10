import * as types from '../../actions/actionTypes';

const initialState = {
  hotList: [],
  status: 'null',
  count: 0,
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
    default:
      return state;
  }
}


export default hotList;
