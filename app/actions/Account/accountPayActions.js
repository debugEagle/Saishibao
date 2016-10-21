import * as types from '../actionTypes';
import Common from '../../common/constants'
import HTTPUtil from '../../common/utils/HTTPUtil';

import { AsyncStorage } from 'react-native';

import TabBarView from '../../containers/TabBarView'
import AccountTicket from '../../pages/Account/AccountTicket'

import * as WeChat from 'react-native-wechat';

let fetchUserAddOrder = (isDailyMatch, match_id, amount, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url ;
  if (isDailyMatch) {
    url = 'https://api.91buyin.com/texas/daily/match/join/' + match_id;
  }
  else {
    url = 'https://api.91buyin.com/texas/big/match/join/' + match_id;
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
          let orderId = {};
          if (json.code === '0') {
            console.log('json.value ' + json.value);
            orderId = json.value;
            dispatch(receiveAddOrder(orderId));
            success();
          } else {
            if (json.code == '1009') {
              failed('请先登陆');
            } else {
              failed(json.msg);
            }
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


let pay = async function (data, pay_succuss=()=>{}, pay_failed=()=>{}) {
  try {
    let result = await WeChat.pay(data)
    console.log('pay success');
    pay_succuss()
  } catch (e) {
    console.log('pay failed')
    pay_failed()
  }
}

let fetchUserPayOrder = (order_id, pay_succuss=()=>{}, pay_failed=()=>{}, failed=()=>{}) => {

  let url = 'https://api.91buyin.com/order/pay/' + order_id;

  return dispatch => {
    dispatch(fetchPayOrder());
    //type = 0 微信支付
    let postBody = {"type": 0};
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.post(url, postBody, userToken).then((json) => {
        try {
          if (json.code === '0') {
            pay(json.value, pay_succuss, pay_failed)
          } else {
            if (json.code == '1009') {
              failed('请先登陆');
            }else {
              failed(json.msg);
            }
          }
          dispatch(receivePayOrder());
        } catch (e) {
          console.log(e.name)
        }
      },(connect_error)=>{
        console.log(connect_error.msg);
        failed('内部错误');
      });
    })
  }
}

// let fetchUserPayOrder= (wxInfo, success=()=>{}, failed=()=>{}, error=()=>{}) => {
//
//   let url = 'https://api.91buyin.com/order/pay/' + order_id;
//
//   console.log(url);
//   return dispatch => {
//     dispatch(fetchPayWxInfo());
//     //type = 0 微信支付
//     let postBody = {"type": 0};
//     AsyncStorage.getItem(Common.userToken).then((userToken)=>{
//       HTTPUtil.post(url, postBody, userToken).then((json) => {
//         try {
//           console.log(json.code) + console.log(json.msg);
//           let wxInfo = {}
//           if (json.code === '0') {
//             wxInfo = json.value;
//             success();
//           } else {
//             if (json.code == '1009') {
//               failed('请先登陆');
//             }else {
//               failed(json.msg);
//             }
//
//           }
//           dispatch(receivePayWxInfo(wxInfo));
//         } catch (e) {
//           console.log(e.name)
//         }
//       },(connect_error)=>{
//         console.log(connect_error.msg);
//         error();
//       });
//     })
//   }
// }



let fetchAddOrder = () => {
  return {
    type: types.FETCH_ADD_ORDER,
  }
}

let receiveAddOrder = (orderId) => {
  return {
    type: types.RECEIVE_ADD_ORDER,
    orderId: orderId


  }
}

// let fetchPayWxInfo = () => {
//   return {
//     type: types.FETCH_PAY_WX_INFO,
//   }
// }
//
// let receivePayWxInfo = (wxInfo) => {
//   return {
//     type: types.RECEIVE_ADD_ORDER,
//     wxInfo: wxInfo,
//   }
// }

let fetchPayOrder = () => {
  return {
    type: types.FETCH_PAY_ORDER,
  }
}

let receivePayOrder = () => {
  return {
    type: types.RECEIVE_PAY_ORDER,
  }
}



export { fetchUserAddOrder, fetchUserPayOrder, }
