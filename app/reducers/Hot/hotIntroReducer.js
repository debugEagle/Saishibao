import * as types from '../../actions/actionTypes';

const initialState = {
    intro: [],
    isLoading: true,
};

let hotIntro = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HOT_INTRO:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case types.RECEIVE_HOT_INTRO:
      return Object.assign({}, state, {
        intro: action.intro,
        isLoading: false,
      })
    case types.RESET_HOT_INTRO:
      return initialState;

    default:
      return state;
  }
}


export default hotIntro;
