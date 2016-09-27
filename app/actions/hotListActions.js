import * as types from './actionTypes';
import {
  request
} from '../common/utils.js'




let fetchHots = (page, isLoadMore, isLoading) => {


  let hots = [
    // {
    //   bigMatchSerie_id
    //   type: '国内',
    //   city:
    //   country:
    //   name: 'WSOP-2016',
    //   url: require('../imgs/ept-test.jpg'),
    //   startData: '6.21',
    //   endData: '6.28',
    // },
    // count
  ];


  let url = 'https://www.91buyin.com/texas/big/serie/hot?offset=' + (page * 5 - 5);

  console.log(url);
  return dispatch => {
    dispatch(fetchHotList(isLoadMore, isLoading));

    request(url).then((json) => {

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
            listItem.url = row.image_url ? row.image_url : '';

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

        }


      } catch (e) {
        console.log(e.name)
      }
    });
  }

}

let fetchHotList = (isLoadMore, isRefreshing, isLoading) => {
  return {
    type: types.FETCH_HOT_LIST,
    isLoadMore: isLoadMore,
    isLoading: isLoading,
  }
}

let receiveFeedList = (hotList, count) => {
  return {
    type: types.RECEIVE_HOT_LIST,
    hotList: hotList,
    count: count,
  }
}
export {
  fetchHots
}
