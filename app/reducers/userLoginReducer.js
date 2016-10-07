import * as types from '../actions/actionTypes';

const initialState = {
  code: -1,
  msg: '',
  userToken: '',

};

let userLogin = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERLOGIN:
      return initialState
    case types.RECEIVE_USERLOGIN:
      return Object.assign({}, state, {
        code: action.code,
        msg: action.msg,
        userToken: action.userToken,
      })

    default:
      return state;
  }
}


export default userLogin;
