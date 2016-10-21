import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

let fetchHots = (args,success=()=>{},error=()=>{}) => {
  let url = 'https://api.91buyin.com/texas/big/serie/hot';
  let hots = [];
  let oArguments = {
    start: true,
    offset: 0,
    limit: 5
  }

  oArguments = Object.assign({}, oArguments, args)

  let start = oArguments.start
  delete(oArguments.start)

  return dispatch => {
    dispatch(fetchHotList(start));
    HTTPUtil.get(url, oArguments).then((json) => {
      try {
        let count = 0;
        if (json.code === '0') {
          count = json.value.count
          for (let row of json.value.rows) {
            let listItem = {};
            listItem.city = row.organization.casino.address.city.city;
            listItem.country = row.organization.casino.address.city.country.country;
            listItem.bigMatchSerie_id = row.bigMatchSerie_id;
            listItem.name = row.name;
            listItem.cooperated = row.cooperated;
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
          success();
        }
        dispatch(receiveFeedList(hots, count));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
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
