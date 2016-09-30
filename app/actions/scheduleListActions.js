import * as types from './actionTypes';
import { request } from '../common/utils.js';

let fetchSchedule = (area,tour,month) => {
  let url = 'https://www.91buyin.com/texas/big/serie?limit=10&month=' + month
  if (area !== '全部地区'){
    url += '&country=' + area;
  }
  if (tour !== 0){
    url += '&tour=' + tour;
  }
  url = encodeURI(url);
  let matches = [];
  return dispatch => {
    dispatch(fetchScheduleList());
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
          matches = aMatches;
        }
        dispatch(receiveScheduleList(matches));
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

let fetchScheduleList = () => {
  return {
    type: types.FETCH_SCHEDULE_LIST,
  }
}

let receiveScheduleList = (matches) => {
  return {
    type: types.RECEIVE_SCHEDULE_LIST,
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
