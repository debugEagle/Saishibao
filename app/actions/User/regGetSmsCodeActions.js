import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'




let getSmsCode = (mobile) => {
  let url = 'http://www.91buyin.com/user/register/getsmscode';
  return dispatch => {
    if (mobile.length < 11) {
      return
    }
    dispatch(fetchSmsCode());
    post = {mobile: mobile};
    HTTPUtil.post(url, post).then((json) => {
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
