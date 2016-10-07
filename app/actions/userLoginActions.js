import * as types from './actionTypes';
import { request } from '../common/utils.js'




let startUserLogin = (mobile, password) => {
  let url = 'https://www.91buyin.com/user/login';
  return dispatch => {

    dispatch(fetchUserLogin());
    post = {mobile: mobile, password: password};
    request(url, 'POST', 5, post).then((json) => {

      try {
        let {code, msg, value} = json;
        dispatch(receiveUserLogin(code, msg, value));


      } catch (e) {
        console.log(e.name);
      }
    });

  }
}

let receiveUserLogin = (code, msg, userToken) => {
  console.log('receiveUserLogin');

  return {
    type: types.RECEIVE_USERLOGIN,
    code: code,
    msg: msg,
    userToken: userToken,

  }
}

let fetchUserLogin = () => {

  return {
    type: types.FETCH_USERLOGIN,

  }
}




export {
  startUserLogin
}
