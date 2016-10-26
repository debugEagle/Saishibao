import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'





let verifySmsCode = (mobile, smsCode, retrieve, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  const type = retrieve ? 'retrieve' : 'register';
  let url = `https://api.91buyin.com/user/${type}/verifysmscode`;

  return dispatch => {
    if (mobile.length < 4) {
      return
    }
    dispatch(fetchToken());
    post = {mobile: mobile, smscode: smsCode};
    HTTPUtil.post(url, post).then((json) => {
      try {
        let token = ''
        if (json.code === '0') {
          token = json.value;
          success(token);
        } else {
          failed(json.msg);
        }

        dispatch(receiveToken(json.code, json.msg, token));

      } catch (e) {
        console.log(e.name);
      }
    }, (connect_error)=>{
      console.log(connect_error.msg);
      error();
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
