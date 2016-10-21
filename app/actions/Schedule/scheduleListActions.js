import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil';

let fetchSchedule = (area,tour,month,args,success=()=>{},error=()=>{}) => {

  let url = 'https://api.91buyin.com/texas/big/serie?&month=' + month
  let oArguments = {
    start: true,
    offset: 0,
    limit: 15
  }
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

  return dispatch => {
    dispatch(fetchScheduleList(oArguments.start));
    HTTPUtil.get(url).then((json) => {
      try {
        let count = 0;
        let rows = []
        if (json.code === '0') {
          count = json.value.count
          rows = json.value.rows
          success();
        }
        dispatch(receiveScheduleList(count,rows));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
}

let fetchAreaList = (success=()=>{},error=()=>{}) => {
  let url = 'https://api.91buyin.com/country'

  return dispatch => {

    HTTPUtil.get(url).then((json) => {
      try {
        let areaList = []
        if (json.code === '0') {
          areaList = json.value.rows
          success();
        }
        dispatch(receiveAreaList(areaList));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
}

let fetchTourList = (success=()=>{},error=()=>{}) => {
  let url = 'https://api.91buyin.com/tour'

  return dispatch => {

    HTTPUtil.get(url).then((json) => {
      try {
        let tourList = [];
        if (json.code === '0') {
          tourList = json.value.rows
          success();
        }
        dispatch(receiveTourList(tourList));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
    });
  }
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
