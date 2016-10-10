import * as types from '../../actions/actionTypes';

const initialState = {
  code: -1,
  msg: '',

};

let regGetSmsCode = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SMSCODE:
      return initialState
    case types.RECEIVE_SMSCODE:
      return Object.assign({}, state, {
        code: action.code,
        msg: action.msg,
      })

    default:
      return state;
  }
}


export default regGetSmsCode;
