import * as types from '../../actions/actionTypes';
import { getMonths } from '../../common/utils/Date'

const months = getMonths()

const initialState = {
  schedule: {
    areas: [],
    tours: [],
    months,
    matches: [],
    mCount: 0
  },
  showSelectContentView: false,
  status: 'null',
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
      const status = action.start ? 'refreshing' : 'loading'
      return Object.assign({}, state, {
        status: status
      })
    case types.RECEIVE_SCHEDULE_LIST:
      let matches = state.status === 'refreshing' ? [] : state.schedule.matches
      matches = matches.concat(action.matches)
      let s = matches.length < action.count ? 'loaded' : 'finished'
      return Object.assign({}, state, {
        status: s,
        schedule: Object.assign({}, state.schedule, {
          matches: matches,
          mCount: action.count
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
