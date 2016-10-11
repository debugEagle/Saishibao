import * as types from '../actionTypes';
import HTTPUtil from '../../common/utils/HTTPUtil'

let fetchHotIntro = (bigMatchSerie_id, isLoading, success=()=>{}, error=()=>{}) => {

  let intro = {
    // bigMatchSerie_id:
    // intro_image_url: '',
    // intro_title: 'APPT 韩国首尔',
    // intro_content: '',
  }
  let url = 'http://www.91buyin.com/texas/big/serie/' + bigMatchSerie_id;

  return dispatch => {
    dispatch(fetchIntro());
    HTTPUtil.get(url).then((json) => {
      try {
        if (json.code === '0') {
          intro.intro_image_url = json.value.intro_image_url
          intro.intro_title = json.value.intro_title
          intro.intro_content = json.value.intro_content
          intro.bigMatchSerie_id = json.value.bigMatchSerie_id
          success();
        }
        dispatch(receiveIntro(intro));
      } catch (e) {
        console.log(e.name)
      }
    },(connect_error)=>{
      console.log(connect_error.msg);
      error();
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
