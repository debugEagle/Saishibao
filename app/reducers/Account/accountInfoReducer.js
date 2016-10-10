import * as types from '../../actions/actionTypes';

const initialState = {
  code: '',
  msg: '',
  info: '',
};

let cityList = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACCOUNTINFO:
      return initialState
    case types.RECEIVE_ACCOUNTINFO:
      return Object.assign({}, state, {
        code: action.code,
        msg: action.msg,
        info: action.info,
      })
    default:
      return state;
  }
}


export default cityList;
