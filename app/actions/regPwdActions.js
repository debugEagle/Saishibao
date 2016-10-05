import * as types from './actionTypes';
import { request } from '../common/utils.js'




let setRegPwd = (mobile, pwd, token) => {
  let url = 'https://www.91buyin.com/user/register/setpassword';

  return dispatch => {

      dispatch(fetchRegPwd());
      post = {mobile: mobile, password: pwd, token: token};
      request(url, 'POST', 5, post).then((json) => {

        try {
          let {code, msg} = json;

          dispatch(receiveRegPwd(code, msg ));


        } catch (e) {
          console.log(e.name);
        }
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
