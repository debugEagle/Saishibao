import * as types from './actionTypes';
import { request } from '../common/utils.js'




let verifySmsCode = (mobile, smsCode) => {
  let url = 'https://www.91buyin.com/user/register/verifysmscode';

  return dispatch => {
      if (smsCode.length < 4) {
        return
      }
      dispatch(fetchToken());
      post = {mobile: mobile, smscode: smsCode};
      request(url, 'POST', 5, post).then((json) => {

        try {
          let {code, msg, value} = json;
      
          dispatch(receiveToken(code, msg ,value));


        } catch (e) {
          console.log(e.name);
        }
      });

  }
}

let fetchToken = () => {
  return {
    type: types.FETCH_TOKEN,
  }
}

let receiveToken = (code, msg ,token) => {

  return {
    type: types.RECEIVE_TOKEN,
    code: code,
    msg: msg,
    token: token,


  }
}



export {
  verifySmsCode
}
