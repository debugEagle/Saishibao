import * as types from '../actionTypes';
import Common from '../../common/constants'
import HTTPUtil from '../../common/utils/HTTPUtil';

import { AsyncStorage } from 'react-native';

let fetchAccountOrder = (args, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'https://api.91buyin.com/order';
  let oArguments = {
    start: true,
    offset: 0,
    limit: 10
  }

  oArguments = Object.assign({}, oArguments, args)

  delete(oArguments.start)

  return dispatch => {
    dispatch(fetchOrders(args.start));
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.get(url,oArguments,userToken).then((json) => {
        try {
          let orders = []
          let count = 0
          if (json.code === '0') {
            orders = json.value.rows
            count = json.value.count
            success();
          } else if (json.code === '3') {
            success();
          }else {
            failed(json.msg)
          }
          dispatch(receiveOrders(orders, count));
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

let fetchOrders = (start) => {
  return {
    type: types.FETCH_ORDERS,
    start: start,
  }
}

let receiveOrders = (orders, count) => {
  return {
    type: types.RECEIVE_ORDERS,
    orders: orders,
    count: count,
  }
}

export { fetchAccountOrder }
