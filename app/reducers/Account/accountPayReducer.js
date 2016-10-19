import * as types from '../../actions/actionTypes';

const initialState = {
  isLoading: false,
  wxInfo: '',
  orderId: -1,
};

let pay = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ADD_ORDER:
      return Object.assign({}, state, {
        isLoading: true,
        orderId: -1,
      })
    case types.RECEIVE_ADD_ORDER:
      return Object.assign({}, state, {
        isLoading: false,
        orderId: action.orderId,
      })
    // case types.FETCH_PAY_WX_INFO:
    //   return Object.assign({}, state, {
    //     isLoading: true
    //   })
    // case types.RECEIVE_PAY_WX_INFO:
    //   return Object.assign({}, state, {
    //     isLoading: false,
    //     wxInfo: action.wxInfo,
    //   })
    case types.FETCH_PAY_ORDER:
      return Object.assign({}, state, {
        isLoading: true
      })
    case types.RECEIVE_PAY_ORDER:
      return Object.assign({}, state, {
        wxInfo: action.wxInfo,
      })

    default:
      return state;
  }
}

export default pay;
