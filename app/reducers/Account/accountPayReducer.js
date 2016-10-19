import * as types from '../../actions/actionTypes';

const initialState = {
  isLoading: false,
  orderRetCode: -1,
};

let pay = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ADD_ORDER:
      return Object.assign({}, state, {
        isLoading: true
      })
    case types.RECEIVE_ADD_ORDER:
      return Object.assign({}, state, {
        isLoading: false,
        orderRetCode: action.orderRetCode,
      })
    default:
      return state;
  }
}

export default pay;
