import React, {
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import * as ActionCreator from '../actions'
import HotList from '../pages/HotList';

class HotListContainer extends Component {
  render() {
    return (<HotList {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  HotList: state.HotList,
  UserLogin: state.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HotListContainer);
