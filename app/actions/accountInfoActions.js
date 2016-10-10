import * as types from './actionTypes';
import { request } from '../common/utils.js';

import { AsyncStorage } from 'react-native';
import Common from '../common/constants';

let getAccountInfo = () => {
  let url = 'https://www.91buyin.com/user/info';
  return dispatch => {

    dispatch(fetchAccountInfo());

    AsyncStorage.getItem(Common.userToken)
      .then((value) => {
        console.log('userToken ' + value);

        request(url, 'GET', 5, {}, value).then((json) => {

          try {
            let {code, msg} = json;
            dispatch(receiveAccountInfo(code, msg));


          } catch (e) {
            console.log(e.name);
          }
        });

      });

  }
}

let fetchAccountInfo = () => {
  return {
    type: types.FETCH_ACCOUNTINFO,
  }
}

let receiveAccountInfo = (code, msg, info) => {
  return {
    type: types.RECEIVE_ACCOUNTINFO,
    code: code,
    msg: msg,
    info: info,
  }
}
