import * as types from './actionTypes';
import { request } from '../common/utils.js';

import { AsyncStorage } from 'react-native';
import Common from '../common/constants';





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

let startUserLoginWithToken = () => {
  let url = 'https://www.91buyin.com/user';
  return dispatch => {

    dispatch(fetchUserLoginWithToken());

    AsyncStorage.getItem(Common.userToken)
      .then((value) => {
        console.log('userToken ' + value);

        // let value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyIiwiaWF0IjoxNDc1ODQwMDk0LCJleHAiOjE0ODM2MTYwOTR9.oJ6D90eSEAnFUt-7qmDaHVsEdSXQj4d6ZV5_ZcsL3L4';
        request(url, 'GET', 5, {}, value).then((json) => {

          try {
            let {code, msg} = json;
            dispatch(receiveUserLoginWithToken(code, msg));


          } catch (e) {
            console.log(e.name);
          }
        });


      });


  }
}



let receiveUserLogin = (code, msg, userToken) => {
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

let receiveUserLoginWithToken = (code, msg) => {
  return {
    type: types.RECEIVE_USERLOGIN_WITH_TOKEN,
    code: code,
    msg: msg,
  }
}

let fetchUserLoginWithToken = () => {

  return {
    type: types.FETCH_USERLOGIN_WITH_TOKEN,

  }
}





export {
  startUserLogin, startUserLoginWithToken
}
