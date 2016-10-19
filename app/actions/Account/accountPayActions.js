import * as types from '../actionTypes';
import Common from '../../common/constants'
import HTTPUtil from '../../common/utils/HTTPUtil';

import { AsyncStorage, NativeModules } from 'react-native';

const WeChatAPI = NativeModules.WeChatAPI

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
          let orderId = {};
          console.log('json.value ' + json.value);
          if (json.code === '0') {
            orderId = json.value;
            dispatch(receiveAddOrder(orderId));
            success();

          } else {
            if (json.code == '1009') {
              failed('请先登陆');
            }else {
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

let fetchUserPayOrder = (order_id, success=()=>{}, failed=()=>{}, error=()=>{}) => {

  let url = 'http://www.91buyin.com/order/pay/' + order_id;

  console.log(url);
  return dispatch => {
    dispatch(fetchPayOrder());
    //type = 0 微信支付
    let postBody = {"type": 0};
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.post(url, postBody, userToken).then((json) => {
        try {
          // console.log(json.code + json.msg);
          // let wxInfo = {}
          if (json.code === '0') {
            // wxInfo = json.value;
            success();
            WeChatAPI.pay(json.value, (b) => console.log('发送付款命令', 'pay:' + b))
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
        error();
      });
    })
  }
}

// let fetchUserPayOrder= (wxInfo, success=()=>{}, failed=()=>{}, error=()=>{}) => {
//
//   let url = 'http://www.91buyin.com/order/pay/' + order_id;
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
