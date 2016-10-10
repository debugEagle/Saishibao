import Common from '../constants'

import {AsyncStorage} from 'react-native'

let HTTPUtil = {}

HTTPUtil.get = (url, params, token = '') => {
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    }
  }
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }

  return new Promise((resolve, reject) => {
    console.log(url);
    fetch(url, options).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject({status: response.status})
        }
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject({status: -1, msg: err.message});
      })})}


HTTPUtil.post = (url, data, token = '') => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  return new Promise((resolve, reject) => {
    fetch(url, options).then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          reject({status: response.status})
        }
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject({status: -1, msg: err.message});
      })})}

export default HTTPUtil
