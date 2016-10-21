import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil';





let setRegPwd = (mobile, pwd, token,  success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'https://api.91buyin.com/user/register/setpassword';

  return dispatch => {
    dispatch(fetchRegPwd());
    post = {mobile: mobile, password: pwd, token: token};

    HTTPUtil.post(url, post).then((json) => {
      try {
        console.log('json ' + JSON.stringify(json));
        if (json.code === '0') {
          success(json.value);
        } else {
          failed(json.msg);
        }

        dispatch(receiveRegPwd(json.code, json.msg));

      } catch (e) {
        console.log(e.name);
      }
    }, (connect_error)=>{
      console.log(connect_error.msg);
      error();
    });



  }
}

let fetchRegPwd = () => {
  return {
    type: types.FETCH_REGPWD,
  }
}

let receiveRegPwd = (code, msg) => {

  return {
    type: types.RECEIVE_REGPWD,
    code: code,
    msg: msg,


  }
}



export {
  setRegPwd
}
