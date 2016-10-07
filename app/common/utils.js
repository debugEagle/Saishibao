// obtained from react native tutorials
'use strict'

import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';


import {
  NativeModules,
  AsyncStorage,
} from 'react-native'

const httpx = NativeModules.httpx;

let request = (url, method='GET', timeout=5, post={}, userToken='') => {
  console.log('userToken111  ' + userToken);
  let promise = new Promise((resolve, reject) => {
    httpx.request({
      url: url,
      method: method,
      timeout: timeout,
      post: post,
      header: {
        'authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      },


    }, (error, res) => {
      if (error) {
        console.log('error');
        return;
      };
      try {
        let {
          code,
          msg,
        } = res.json;

        console.log('code '+ code +'  '+ msg);
        resolve(res.json);
      } catch (e) {
        console.log(e.name)
      }

    });
  });

  return promise;
}

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  post(url, data, callback) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      callback(responseData);
    })
    .catch((error) => {
      //if (resData.error !== true) {} else {AlertIOS.alert('服务器无响应', '请稍后再试');}
      //consistant with server error msg
      callback({
        error: true,
      });
    });
  },
  key: 'LFDHSFHSFJKHJFHS-REACT-NATIVE',
};

let getMonths = () => {
  let allMonths = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  let _getFullMonth = (m) => {
    let y = year;
    if (m <= 0) {
      m += 12;
      y -= 1;
    }
    if (m > 12) {
      m -= 12;
      y += 1;
    }
    let _month = m < 10 ? '0' + m : m;
    let _fullMonth = `${y}${_month}`;
    return _fullMonth
  }

  for (let i = 7; i >= -7; i--) {
    allMonths.push(_getFullMonth(month-i))
  }

  return allMonths
}

//返回日期字符串
let getDataStr = (AddDayCount) =>  {
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth()+1;//获取当前月份的日期
  var d = dd.getDate();
  return y+"-"+m+"-"+d;
}





export { Util, request, getMonths, getDataStr} ;
