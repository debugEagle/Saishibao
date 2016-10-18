import * as types from '../../actions/actionTypes';

const initialState = {
  used: {
    tickets: [],
    status: 'null',
    count: 0,
  },
  unused: {
    tickets: [],
    status: 'null',
    count: 0,
  }
};

let tickets = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TICKETS:
      const status = action.start ? 'refreshing' : 'loading'
      if (action.used) {
        return Object.assign({}, state, {
          used: Object.assign({}, state.used, {
            status: status,
          })
        })
      }
      return Object.assign({}, state, {
        unused: Object.assign({}, state.unused, {
          status: status,
        })
      })
    case types.RECEIVE_TICKETS:
      if (action.used) {
        let tickets = state.used.status === 'refreshing' ? [] : state.usesd.tickets
        tickets = tickets.concat(action.tickets)
        let s = tickets.length < action.count ? 'loaded' : 'finished'
        return Object.assign({}, state, {
          used: Object.assign({}, state.used, {
            tickets: tickets,
            count: action.count,
            status: s
          })
        })
      } else {
        let tickets = state.unused.status === 'refreshing' ? [] : state.unused.tickets
        tickets = tickets.concat(action.tickets)
        let s = tickets.length < action.count ? 'loaded' : 'finished'
        return Object.assign({}, state, {
          unused: Object.assign({}, state.unused, {
            tickets: tickets,
            count: action.count,
            status: s
          })
        })
      }

    default:
      return state;
  }
}


export default tickets;
