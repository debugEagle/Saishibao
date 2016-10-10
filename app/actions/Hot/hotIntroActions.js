import * as types from '../actionTypes';
import {
  request
} from '../../common/utils.js'


import {
  NativeModules,
  AlertIOS,
} from 'react-native'

const httpx = NativeModules.httpx;



let fetchHotIntro = (bigMatchSerie_id, isLoading) => {

  let intro = {
    // bigMatchSerie_id:
    // intro_image_url: '',
    // intro_title: 'APPT 韩国首尔',
    // intro_content: '',
  }
  let url = 'https://www.91buyin.com/texas/big/serie/' + bigMatchSerie_id;


  return dispatch => {
    dispatch(fetchIntro());

    request(url).then((json) => {

      try {
        let {
          code,
          value: {
            intro_image_url,
            intro_title,
            intro_content,
          }
        } = json;

        if (code === '0') {
          
          intro = {
            intro_image_url,
            intro_title,
            intro_content,
            bigMatchSerie_id,
          };

          dispatch(receiveIntro(intro));


        }


      } catch (e) {
        console.log(e.name)
      }
    });




  }
}

let fetchIntro = () => {
  return {
    type: types.FETCH_HOT_INTRO,
  }
}

let receiveIntro = (intro) => {
  return {
    type: types.RECEIVE_HOT_INTRO,
    intro: intro,
  }
}

let resetHotIntro = () => {
  return {
    type: types.RESET_HOT_INTRO,

  }
}


export {
  fetchHotIntro,
  resetHotIntro
}
