import * as types from './actionTypes';
import { request } from '../common/utils.js'




let getSmsCode = (mobile) => {
  let url = 'https://www.91buyin.com/user/register/getsmscode';
  return dispatch => {
    dispatch(fetchSmsCode());
    post = {mobile: mobile};
    request(url, 'POST', 5, post).then((json) => {

      try {
        let {code, msg} = json;

        dispatch(receiveSmsCode(code, msg));

      } catch (e) {
        console.log(e.name);
      }
    });

  }
}

let receiveSmsCode = (code, msg) => {

  return {
    type: types.RECEIVE_SMSCODE,
    code: code,
    msg: msg,

  }
}

let fetchSmsCode = () => {

  return {
    type: types.FETCH_SMSCODE,

  }
}




export {
  getSmsCode, receiveSmsCode
}
