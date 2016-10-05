import * as types from './actionTypes';
import { request } from '../common/utils.js';

let fetchSchedule = (area,tour,month,args) => {
  let oArguments = {
    start: true,
    offset: 0,
    limit: 15
  }
  let url = 'https://www.91buyin.com/texas/big/serie?&month=' + month
  if (area !== '全部地区'){
    url += '&country=' + area;
  }
  if (tour !== 0){
    url += '&tour=' + tour;
  }
  if (!args.start) {
    oArguments = Object.assign({}, oArguments, args)
  }
  url = url + '&offset=' + oArguments.offset + '&limit=' + oArguments.limit

  url = encodeURI(url);
  let matches = [];
  let count = 0;
  return dispatch => {
    dispatch(fetchScheduleList(oArguments.start));
    request(url).then((json) => {
      try {
        let {
          code,
          value: {
            count: iCount,
            rows: aMatches
          },
        } = json;
        if (code === '0') {
          count = iCount;
          matches = aMatches;
        }
        dispatch(receiveScheduleList(count,matches));
      } catch (e) {
        console.log(e.name)
      }
    });
  };
}

let fetchAreaList = () => {
  let url = 'https://www.91buyin.com/country'
  url = encodeURI(url);
  let areaList = [];
  return dispatch => {
    request(url).then((json) => {
      try {
        let {
          code,
          value: aArea,
        } = json;
        if (code === '0') {
          areaList = aArea;
        }
        dispatch(receiveAreaList(areaList));
      } catch (e) {
        console.log(e.name)
      }
    });
  };
}

let fetchTourList = () => {
  let url = 'https://www.91buyin.com/tour'
  url = encodeURI(url);
  let tourList = [];
  return dispatch => {
    request(url).then((json) => {
      try {
        let {
          code,
          value: aTour,
        } = json;
        if (code === '0') {
          tourList = aTour;
        }
        dispatch(receiveTourList(tourList));
      } catch (e) {
        console.log(e.name)
      }
    });
  };
}

let fetchScheduleList = (start) => {
  return {
    type: types.FETCH_SCHEDULE_LIST,
    start: start
  }
}

let receiveScheduleList = (count,matches) => {
  return {
    type: types.RECEIVE_SCHEDULE_LIST,
    count: count,
    matches: matches
  }
}

let changeScheduleSelected = (area,tour,month) => {
  return {
    type: types.CHANGE_SCHEDULE_SELECTED,
    area: area,
    tour: tour,
    month: month
  }
}

let changeSelectContentShow = () => {
  return {
    type: types.CHANGE_SELECTE_CONTENT_SHOW,
  }
}

let receiveAreaList = (areaList) => {
  return {
    type: types.RECEIVE_AREA_LIST,
    areaList: areaList
  }
}

let receiveTourList = (tourList) => {
  return {
    type: types.RECEIVE_TOUR_LIST,
    tourList: tourList
  }
}

export { fetchSchedule, fetchAreaList, fetchTourList, changeSelectContentShow ,changeScheduleSelected }
