import * as types from '../../actions/actionTypes';

const initialState = {
  code: -1,
  msg: '',

};

let regPwd = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REGPWD:
      return initialState
    case types.RECEIVE_REGPWD:
      return Object.assign({}, state, {
        code: action.code,
        msg: action.msg,
      })

    default:
      return state;
  }
}


export default regPwd;
