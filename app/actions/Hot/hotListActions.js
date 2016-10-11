import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

import {request} from '../../common/utils.js'

// let fetchHots = (args) => {
//   let hots = [];
//   let oArguments = {
//     start: true,
//     offset: 0,
//     limit: 5
//   }
//   if (!args.start) {
//     oArguments = Object.assign({}, oArguments, args)
//   }
//   let url = 'https://www.91buyin.com/texas/big/serie/hot?offset=' + oArguments.offset + '&limit=' + oArguments.limit;
//   return dispatch => {
//     dispatch(fetchHotList(oArguments.start));
//     request(url).then((json) => {
//       try {
//         let {
//           code,
//           value: {
//             count: count,
//             rows: rows
//           }
//         } = json;
//         if (code === '0') {
//           for (let row of rows) {
//             let listItem = {};
//             listItem.city = row.organization.casino.address.city.city;
//             listItem.country = row.organization.casino.address.city.country.country;
//             listItem.bigMatchSerie_id = row.bigMatchSerie_id;
//             listItem.name = row.name;
//             listItem.url = row.image_url
//             ? row.image_url
//             : '';
//
//             if (row.type === 1) {
//               listItem.type = '国际';
//             } else if (row.type === 2) {
//               listItem.type = '国内';
//             } else if (row.type === 3) {
//               listItem.type = '俱乐部';
//             }
//             let startDate = new Date(row.start_date);
//             listItem.startDate = startDate.getMonth() + 1 + '.' + startDate.getDate();
//             let endDate = new Date(row.end_date);
//             listItem.endDate = endDate.getMonth() + 1 + '.' + endDate.getDate();
//             hots.push(listItem);
//           }
//           dispatch(receiveFeedList(hots, count));
//         }
//       } catch (e) {
//         console.log(e.name)
//       }
//     });
//   }
// }



let fetchHots = (args,success=()=>{}, failed=()=>{}) => {
  let url = 'http://www.91buyin.com/texas/big/serie/hot';
  let hots = [];
  let oArguments = {
    start: true,
    offset: 0,
    limit: 5
  }
  if (!args.start) {
    oArguments = Object.assign({}, oArguments, args)
  }
  delete(oArguments.start)

  return dispatch => {
    dispatch(fetchHotList(oArguments.start));
    HTTPUtil.get(url, oArguments).then((json) => {
      try {
        let {
          code,
          value: {
            count: count,
            rows: rows
          }
        } = json;
        if (code === '0') {
          for (let row of rows) {
            let listItem = {};
            listItem.city = row.organization.casino.address.city.city;
            listItem.country = row.organization.casino.address.city.country.country;
            listItem.bigMatchSerie_id = row.bigMatchSerie_id;
            listItem.name = row.name;
            listItem.url = row.image_url
              ? row.image_url
              : '';
            if (row.type === 1) {
              listItem.type = '国际';
            } else if (row.type === 2) {
              listItem.type = '国内';
            } else if (row.type === 3) {
              listItem.type = '俱乐部';
            }
            let startDate = new Date(row.start_date);
            listItem.startDate = startDate.getMonth() + 1 + '.' + startDate.getDate();
            let endDate = new Date(row.end_date);
            listItem.endDate = endDate.getMonth() + 1 + '.' + endDate.getDate();
            hots.push(listItem);
          }
          dispatch(receiveFeedList(hots, count));
          success();
        }
      } catch (e) {
        console.log(e.name)
        failed()
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      failed();
    });
  }
}

let fetchHotList = (start) => {
  return {type: types.FETCH_HOT_LIST, start: start}
}

let receiveFeedList = (hotList, count) => {
  return {type: types.RECEIVE_HOT_LIST, hotList: hotList, count: count}
}
export {fetchHots}
