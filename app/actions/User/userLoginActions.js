import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

import { AsyncStorage } from 'react-native';
import Common from '../../common/constants';

let startUserLogin = (mobile, password, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'http://www.91buyin.com/user/login';
  post = {mobile: mobile, password: password};

  return dispatch => {
    dispatch(fetchUserLogin());
    HTTPUtil.post(url, post).then((json) => {
      try {
        let userToken = ''
        if (json.code === '0') {
          userToken = json.value;
          success(userToken);
        } else {
          failed(json.msg);
        }
        dispatch(receiveUserLogin(json.code, json.msg, userToken));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
}

let startUserLoginWithToken = () => {
  let url = 'http://www.91buyin.com/user';
  return dispatch => {
    dispatch(fetchUserLoginWithToken());
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.get(url,null,userToken).then((json) => {
        console.log(json);
        try {
          let {code, msg} = json;
          dispatch(receiveUserLoginWithToken(code, msg));
        } catch (e) {
          console.log(e.name)
        }
      },(connect_error)=>{
        console.log(connect_error.msg);
      });
    })
  }
  return dispatch => {

    dispatch(fetchUserLoginWithToken());

    AsyncStorage.getItem(Common.userToken)
      .then((value) => {
        if (!value) {
          console.log('userToken exit');
          // return
        }
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

let userLogout = () => {
  let url = 'https://www.91buyin.com/user';
  return dispatch => {
    console.log('userLogout');
    AsyncStorage.setItem(Common.userToken, '');
    dispatch(receiveLogout());
  //
  //   dispatch(fetchUserLoginWithToken());
  //
  //   AsyncStorage.getItem(Common.userToken)
  //     .then((value) => {
  //       console.log('userToken ' + value);
  //
  //       // let value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyIiwiaWF0IjoxNDc1ODQwMDk0LCJleHAiOjE0ODM2MTYwOTR9.oJ6D90eSEAnFUt-7qmDaHVsEdSXQj4d6ZV5_ZcsL3L4';
  //       request(url, 'GET', 5, {}, value).then((json) => {
  //
  //         try {
  //           let {code, msg} = json;
  //           dispatch(receiveUserLoginWithToken(code, msg));
  //
  //
  //         } catch (e) {
  //           console.log(e.name);
  //         }
  //       });
  //
  //
  //     });
  //
  //
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

let receiveLogout = () => {
  return {
    type: types.RECEIVE_USERLOGOUT,

  }
}





export {
  startUserLogin, startUserLoginWithToken, userLogout
}
