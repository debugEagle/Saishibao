import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

// let matchResult = {
//   //存入json数据模版
//   "items":
//   [
//     {"rank": 1, "name": "张三", "bonus":10000},
//     {"rank": 2, "name": "李四", "bonus":5000},
//     {"rank": 3, "name": "王五", "bonus":5000},
//     {"rank": 4, "name": "老张", "bonus":5000},
//     {"rank": 5, "name": "叶凡", "bonus":5000},
//     {"rank": 6, "name": "王大顺", "bonus":5000},
//     {"rank": 7, "name": "景繁星", "bonus":5000}
//   ]
// }


let fetchDailyResult = (match_id, success=()=>{}, error=()=>{}) => {

  let url = 'http://www.91buyin.com/texas/setting/' + match_id;

  return dispatch => {
    dispatch(fetchResult());
    HTTPUtil.get(url).then((json) => {
      try {
        let matchResult = {};
        console.log(json.value.result);
        if (json.code === '0') {
          matchResult = JSON.parse(json.value.result);

          success();
        }
        dispatch(receiveResult(matchResult));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
}


let resetDailyResult = () => {

  return {
    type: types.RESET_MATCH_SETTING,
  }
}

let fetchResult = () => {

  return {
    type: types.FETCH_DAILY_MATCH_RESULT,
  }
}

let receiveResult = (matchResult) => {
  return {
    type: types.RECEIVE_DAILY_MATCH_RESULT,
    matchResult: matchResult,
  }
}
export {
  fetchDailyResult, resetDailyResult
}
