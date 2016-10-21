import * as types from '../actionTypes';
import Common from '../../common/constants'
import HTTPUtil from '../../common/utils/HTTPUtil';

import { AsyncStorage } from 'react-native';

let fetchAccountInfo = (success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'https://api.91buyin.com/user/info';

  return dispatch => {
    dispatch(fetchAccountInfoAction());
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.get(url,null,userToken).then((json) => {
        try {
          let info = {}
          if (json.code === '0') {
            info = json.value
            success();
          } else {
            failed(json.msg)
          }
          dispatch(receiveAccountInfo(info));
        } catch (e) {
          console.log(e.name)
        }
      },(connect_error)=>{
        console.log(connect_error.msg);
        error();
      });
    })
  }
}

let setAccountInfo = (attr, value, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'https://api.91buyin.com/user/info/supplement/perfect'
  let data = {}
  data[attr] = value;

  return dispatch => {
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.post(url, data, userToken).then((json) => {
        console.log(url);
        console.log(data);
        try {
          if (json.code === '0') {
            dispatch(updateAccountInfo(attr, value))
            success();
          } else {
            failed(json.msg)
          }
        } catch (e) {
          console.log(e.name)
        }
      },(connect_error)=>{
        console.log(connect_error.msg);
        error();
      });
    })
  }
}

let fetchAccountInfoAction = () => {
  return {
    type: types.FETCH_ACCOUNTINFO,
  }
}

let receiveAccountInfo = (info) => {
  return {
    type: types.RECEIVE_ACCOUNTINFO,
    info: info,
  }
}

let updateAccountInfo = (attr, value) => {
  return {
    type: types.UPDATE_ACCOUNTINFO,
    attr: attr,
    value: value
  }
}

let setAccountInfoAction = (key, value) => {
  return {
    type: types.SET_ACCOUNTINFO,
    key: key,
    value: value
  }
}

export { fetchAccountInfo, setAccountInfo, updateAccountInfo }
