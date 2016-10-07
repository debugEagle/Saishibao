import * as types from '../actions/actionTypes';

const initialState = {
  code: -1,
  msg: '',
  userToken: '',
  haveLogined: false,


};

let haveLogined;

let userLogin = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERLOGIN:
      return initialState
    case types.RECEIVE_USERLOGIN:
      console.log('haveLogined = true ' + action.code);
      if (action.code == 0) {
        console.log('haveLogined = true');
        haveLogined = true;
      }else {
        haveLogined = false;
      }

      return Object.assign({}, state, {
        code: action.code,
        msg: action.msg,
        userToken: action.userToken,
        haveLogined: haveLogined,


      })

      case types.FETCH_USERLOGIN_WITH_TOKEN:
        return initialState
      case types.RECEIVE_USERLOGIN_WITH_TOKEN:
        if (action.code == 0) {
          haveLogined = true;
        }else {
          haveLogined = false;
        }

        return Object.assign({}, state, {
          code: action.code,
          msg: action.msg,
          haveLogined: haveLogined,
        })

    default:
      return state;
  }
}


export default userLogin;
