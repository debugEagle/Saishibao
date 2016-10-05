import * as types from './actionTypes';

let elseSecondInterval;
let elseSeconds ;

let startTimer = () => {
  return dispatch => {
    dispatch(startTimerElse());

    let timerElseSecond = () => {

        elseSeconds = elseSeconds - 1;
        dispatch(setElseSecond(elseSeconds));

        if (elseSeconds <= 0) {
          clearInterval(elseSecondInterval);
          dispatch(stopTimerElse());
        }

        console.log('elseSeconds ' + elseSeconds);

    }
    elseSeconds = 10
    elseSecondInterval = setInterval(()=>timerElseSecond(),1000);

  }

}

let startTimerElse = () => {
  return {
    type: types.START_TIMER_ELSE,
  }
}

let stopTimerElse = () => {
  return {
    type: types.STOP_TIMER_ELSE,
  }
}
let setElseSecond = (elseSeconds) => {
  return {
    elseSeconds: elseSeconds,
    type: types.SET_ELSE_TIME,
  }
}

export { startTimer };
