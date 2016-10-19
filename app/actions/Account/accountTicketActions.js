import * as types from '../actionTypes';
import Common from '../../common/constants'
import HTTPUtil from '../../common/utils/HTTPUtil';

import { AsyncStorage } from 'react-native';

let fetchAccountTicket = (args, success=()=>{}, failed=()=>{}, error=()=>{}) => {
  let url = 'http://www.91buyin.com/ticket';
  let oArguments = {
    start: true,
    used: 0,
    offset: 0,
    limit: 10
  }

  oArguments = Object.assign({}, oArguments, args)

  delete(oArguments.start)

  return dispatch => {
    dispatch(fetchTickets(oArguments.used, args.start));
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.get(url,oArguments,userToken).then((json) => {
        try {
          let tickets = []
          let count = 0
          if (json.code === '0') {
            tickets = json.value.rows
            count = json.value.count
            success();
          } else if (json.code === '3') {
            tickets = []
            count = 0
            success();
          } else {
            failed(json.msg)
          }
          dispatch(receiveTickets(oArguments.used, tickets, count));
        } catch (e) {
          console.log(e.name)
        }
      },(connect_error)=>{
        console.log(connect_error.msg);
        error();
      });
    })
  }
}

let fetchTickets = (used, start) => {
  return {
    type: types.FETCH_TICKETS,
    start: start,
    used: used
  }
}

let receiveTickets = (used, tickets, count) => {
  return {
    type: types.RECEIVE_TICKETS,
    tickets: tickets,
    count: count,
    used: used
  }
}

export { fetchAccountTicket }
