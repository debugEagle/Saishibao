import * as types from '../actionTypes';
import Common from '../../common/constants'
import HTTPUtil from '../../common/utils/HTTPUtil';

import { AsyncStorage } from 'react-native';

let fetchUserAddOrder = (isDailyMatch, match_id, amount, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url ;
  if (isDailyMatch) {
    url = 'http://www.91buyin.com/texas/daily/match/join/' + match_id;
  }
  else {
    url = 'http://www.91buyin.com/texas/big/match/join/' + match_id;
  }

  console.log(url);
  return dispatch => {
    dispatch(fetchAddOrder());
    //type = 0 微信支付
    let postBody = {"type": 0, amount: amount};
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.post(url, postBody, userToken).then((json) => {
        try {
          console.log(json.code) + console.log(json.msg);
          if (json.code === '0') {

            success();
          } else {
            if (json.code == '1009') {
              failed('请先登陆');
            }else {
              failed(json.msg);
            }

          }
          dispatch(receiveAddOrder(json.code));
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


let fetchAddOrder = (orderRetCode) => {
  return {
    type: types.FETCH_ADD_ORDER,
    orderRetCode: orderRetCode,
  }
}

let receiveAddOrder = () => {
  return {
    type: types.RECEIVE_ADD_ORDER,
  }
}



export { fetchUserAddOrder }
