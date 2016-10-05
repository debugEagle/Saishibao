import React, { Component } from 'react';
import {connect} from 'react-redux';
import DailyInfo from '../pages/DailyInfo';

import { bindActionCreators } from 'redux';
import * as ActionCreator from '../actions'

class DailyInfoContainer extends Component {
  render() {
    return (
      <DailyInfo {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  DailyInfo: state.DailyInfo,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyInfoContainer);
