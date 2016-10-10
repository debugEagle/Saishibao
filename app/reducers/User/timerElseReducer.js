import * as types from '../../actions/actionTypes';

const initialState = {
    isRunning: false,
    elseSeconds: 60,
};

let cityList = (state = initialState, action) => {
  switch (action.type) {
    case types.START_TIMER_ELSE:
      return Object.assign({}, state, {
        isRunning: true,
      })
    case types.SET_ELSE_TIME:
      return Object.assign({}, state, {
        elseSeconds: action.elseSeconds,
      })
    case types.STOP_TIMER_ELSE:
      return Object.assign({}, state, {
        isRunning: false,
        elseSeconds: 60,
      })
    default:
      return state;
  }
}


export default cityList;
