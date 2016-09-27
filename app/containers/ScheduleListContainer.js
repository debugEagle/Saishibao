import React, { Component } from 'react';
import {connect} from 'react-redux';
import ScheduleList from '../pages/ScheduleList';

import { bindActionCreators } from 'redux';
import * as ActionCreator from '../actions'

class ScheduleListContainer extends Component {
  render() {
    return (
      <ScheduleList {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  ScheduleList: state.ScheduleList,
  CityList: state.CityList
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleListContainer);
