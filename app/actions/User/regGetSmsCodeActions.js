import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'




let getSmsCode = (mobile, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'http://www.91buyin.com/user/register/getsmscode';
  return dispatch => {
    if (mobile.length < 11) {
      return
    }
    dispatch(fetchSmsCode());
    post = {mobile: mobile};
    HTTPUtil.post(url, post).then((json) => {
      try {
        console.log('json ' + JSON.stringify(json));
        let {code, msg} = json;

        if (code === '0') {
          success();
        } else {
          failed(msg);
        }

        dispatch(receiveSmsCode(code, msg));

      } catch (e) {
        console.log(e.name);
      }
    }, (connect_error)=>{
      console.log(connect_error.msg);
      error();
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
