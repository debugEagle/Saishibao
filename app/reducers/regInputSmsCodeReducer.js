import * as types from '../actions/actionTypes';

const initialState = {
  token: '',
  code: -1,
  msg: '',

};

let regInputSmsCode = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TOKEN:
      return initialState
    case types.RECEIVE_TOKEN:
      return Object.assign({}, state, {
        code: action.code,
        msg: action.msg,
        token: action.token,

      })

    default:
      return state;
  }
}


export default regInputSmsCode;
