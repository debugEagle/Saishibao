import * as types from '../../actions/actionTypes';

const initialState = {
  orders: [],
  status: 'null',
  count: 0,
};

let orders = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      const status = action.start ? 'refreshing' : 'loading'
      return Object.assign({}, state, {
        status: status
      })
    case types.RECEIVE_ORDERS:
      let orders = state.status === 'refreshing' ? [] : state.orders
      orders = orders.concat(action.orders)
      let s = orders.length < action.count ? 'loaded' : 'finished'
      return Object.assign({}, state, {
        orders: orders,
        count: action.count,
        status: s
      })
    default:
      return state;
  }
}

export default orders;
