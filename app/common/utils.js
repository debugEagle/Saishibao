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

export { Util, request } ;
