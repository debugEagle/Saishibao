import React, { Component } from 'react';
import {connect} from 'react-redux';
import DailyList from '../pages/DailyList';

import { bindActionCreators } from 'redux';
import * as ActionCreator from '../actions'

class DailyListContainer extends Component {
  render() {
    return (
      <DailyList {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  DailyList: state.DailyList,
  CityList: state.CityList
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyListContainer);
