import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

let matchResult = {
  items:
  [
    {rank: 1, name: '张三', bonus:10000},
    {rank: 2, name: '李四', bonus:5000},
    {rank: 3, name: '王五', bonus:5000},
    {rank: 4, name: '老张', bonus:5000},
    {rank: 5, name: '叶凡', bonus:5000},
    {rank: 6, name: '王大顺', bonus:5000},
    {rank: 7, name: '景繁星', bonus:5000}
  ]
}
//存入数据库json格式
// {
// "blindTime": 30,
// "chip": 10000,
// "items":
// [
// {"level": 1, "sb": 25, "bb": 50, "ante": 0},
// {"level": 2, "sb": 50, "bb": 100, "ante": 0},
// {"level": 3, "sb": 75, "bb": 150, "ante": 0,"appText": "休息10分钟"},
// {"level": 4, "sb": 100, "bb": 200, "ante": 25},
// {"level": 5, "sb": 150, "bb": 300, "ante": 25},
// {"level": 6, "sb": 200, "bb": 400, "ante": 50},
// {"level": 7, "sb": 300, "bb": 600, "ante": 75,"appText": "关闭注册,休息20分钟"},
// {"level": 8, "sb": 400, "bb": 800, "ante": 100},
// {"level": 9, "sb": 500, "bb": 1000, "ante": 100},
// {"level": 10, "sb": 600, "bb": 1200, "ante": 200},
// {"level": 11, "sb": 800, "bb": 1600, "ante": 200,"appText": "休息10分钟"},
// {"level": 12, "sb": 1000, "bb": 2000, "ante": 200},
// {"level": 13, "sb": 1200, "bb": 2400, "ante": 300},
// {"level": 14, "sb": 1500, "bb": 3000, "ante": 3000,"appText": "休息10分钟"},
// {"level": 15, "sb": 2000, "bb": 4000, "ante": 500},
// {"level": 16, "sb": 2500, "bb": 5000, "ante": 500},
// {"level": 17, "sb": 3000, "bb": 6000, "ante": 500,"appText": "休息10分钟"},
// {"level": 18, "sb": 4000, "bb": 8000, "ante": 1000},
// {"level": 19, "sb": 5000, "bb": 10000, "ante": 1000},
// {"level": 20, "sb": 6000, "bb": 12000, "ante": 2000,"appText": "比赛暂停20分"},
// {"level": 21, "sb": 8000, "bb": 16000, "ante": 2000},
// {"level": 22, "sb": 8000, "bb": 16000, "ante": 3000},
// {"level": 23, "sb": 10000, "bb": 20000, "ante": 3000},
// {"level": 24, "sb": 12000, "bb": 24000, "ante": 3000}
// ],
// "bonuses":
//   [
//     {"ranking": 1, "bonus": 88888, "remark": "3张CPG邀请函+58888积分"},
//     {"ranking": 2, "bonus": 58888, "remark": "2张CPG邀请函+38888积分" },
//     {"ranking": 3, "bonus": 38888, "remark": "1张CPG邀请函+28888积分" },
//     {"ranking": 4, "bonus": 22888, "remark": "1张CPG邀请函+12888积分" },
//     {"ranking": 5, "bonus": 13888, "remark": "1张CPG邀请函+3888积分"},
//     {"ranking": 6, "bonus": 10888, "remark": "1张CPG邀请函+888积分" },
//     {"ranking": 7, "bonus": 8688, "remark": "8688会员积分"},
//     {"ranking": 8, "bonus": 7588},
//     {"ranking": 9, "bonus": 6588 },
//     {"ranking": 10, "bonus": 5588 }
//   ]
// };

let fetchDailyResult = ( success=()=>{}, error=()=>{}) => {

  return dispatch => {
    dispatch(fetchResult());
    dispatch(receiveResult(matchResult));
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
