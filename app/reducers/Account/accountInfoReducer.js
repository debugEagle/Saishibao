import * as types from '../../actions/actionTypes';

const initialState = {
  isLoading: false,
  info: {}
};

let info = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACCOUNTINFO:
      return Object.assign({}, state, {
        isLoading: true
      })
    case types.RECEIVE_ACCOUNTINFO:
      return Object.assign({}, state, {
        isLoading: false,
        info: action.info,
      })
    case types.UPDATE_ACCOUNTINFO:
      let attr_value = {}
      attr_value[action.attr] = action.value
      return Object.assign({}, state, {
        info: Object.assign({}, state.info, attr_value),
      })
    default:
      return state;
  }
}

export default info;
