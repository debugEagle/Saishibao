import * as types from '../actions/actionTypes';


const initialState = {
    matches: [],
    isLoading: true,
};

let scheduleDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SCHEDULE_DETAIL:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case types.RECEIVE_SCHEDULE_DETAIL:
      return Object.assign({}, state, {
        matches: action.matches,
        isLoading: false,
      })
    case types.RESET_SCHEDULE_DETAIL:
      return initialState;
    default:
      return state;
  }
}

export default scheduleDetail;
