import * as types from '../actions/actionTypes';
import { getMonths } from '../common/utils'

const months = getMonths()

const initialState = {
  schedule: {
    areas: [],
    tours: [],
    months: months,
    matches: []
  },
  showSelectContentView: false,
  isLoading: false,
  selected: {
    area: '全部地区',
    tour: 0,
    month: months[7]
  }
};

let scheduleList = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_AREA_LIST:
      return Object.assign({}, state, {
        schedule: Object.assign({}, state.schedule, {
          areas: action.areaList
        })
      })
    case types.RECEIVE_TOUR_LIST:
      return Object.assign({}, state, {
        schedule: Object.assign({}, state.schedule, {
          tours: action.tourList
        })
      })
    case types.FETCH_SCHEDULE_LIST:
      return Object.assign({}, state, {
        isLoading: true
      })
    case types.RECEIVE_SCHEDULE_LIST:
      return Object.assign({}, state, {
        isLoading: false,
        schedule: Object.assign({}, state.schedule, {
          matches: action.matches
        })
      })
    case types.CHANGE_SCHEDULE_SELECTED:
      return Object.assign({}, state, {
        selected: Object.assign({}, state.selected, {
          area: action.area,
          tour: action.tour,
          month: action.month,
        })
      })
    case types.CHANGE_SELECTE_CONTENT_SHOW:
      return Object.assign({}, state, {
        showSelectContentView: !state.showSelectContentView
      })
    default:
      return state;
  }
}

export default scheduleList;
