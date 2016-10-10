import * as types from '../actionTypes';
import { request } from '../../common/utils.js'


import {
  NativeModules,
  AlertIOS,
} from 'react-native'



let fetchHotDays = (bigMatchSerie_id) => {

  let hotDayList = [
    // {
    //   match_day: "2016-09-01T00:00:00.000Z"
    //   month: 9,
    //   day: 1,
    //  bigMatch_id
    // remark

    // },

  ];

  let hotDayDetailList = [];
  let url = 'https://www.91buyin.com/texas/big/serie/match/' + bigMatchSerie_id;

  return dispatch => {

    request(url).then((json) => {

      try {
        let {
          code,
          value: {
            rows: rows
          }
        } = json;

        if (code === '0') {
          for (let row of rows) {

            let detaiListItem = {};
            let match_day = new Date(row.match_day);

            detaiListItem = row;
            detaiListItem.match_day = row.match_day;
            detaiListItem.year = match_day.getFullYear() ;
            detaiListItem.month = match_day.getMonth() + 1;
            detaiListItem.day = match_day.getDate();
            detaiListItem.remark = row.remark;


            hotDayDetailList.push(detaiListItem);


            let haveFlag = false;
            for (let item of hotDayList) {

              if (row.match_day === item.match_day) {
                haveFlag = true;
              }
            }

            //去掉相同日期
            if (haveFlag === false) {
              let listItem = {};
              let match_day = new Date(row.match_day);

              listItem.match_day = row.match_day;
              listItem.year = match_day.getFullYear() ;
              listItem.month = match_day.getMonth() + 1;
              listItem.day = match_day.getDate();

              hotDayList.push(listItem);

            }

            //根据时间排序
            hotDayList.sort((a,b) => {
              aDate = new Date(a.match_day);
              bDate = new Date(b.match_day);
              return aDate - bDate;
            });
          }


          dispatch(fetchInfo());
          dispatch(receiveInfo(hotDayList, hotDayDetailList));
          dispatch(selectHotDayDetail(hotDayList[0].match_day));

        }


      } catch (e) {
        console.log(e.name)
      }
    });
  }

}

let selectHotDayDetail = (match_day) => {
   return {
     type: types.FETCH_HOT_DAY_DETAIL,
     match_day: match_day,

   }

}



let fetchInfo = () => {
  return {
    type: types.FETCH_HOT_DAY_LIST,

  }
}

let receiveInfo = (hotDayList, hotDayDetailList) => {
  // show(hotDayList.length);
  return {
    type: types.RECEIVE_HOT_DAY_LIST,
    hotDayList: hotDayList,
    hotDayDetailList: hotDayDetailList,
  }
}

let resetHotDayList = () => {

    return {
        type: types.RESET_HOT_DAY_LIST,

    }
}


export {
  fetchHotDays,
  resetHotDayList,
  selectHotDayDetail

}
