import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreator from '../actions'
import ScheduleDetail from '../pages/ScheduleDetail';

class ScheduleDetailContainer extends Component {
    render() {
        return (
            <ScheduleDetail {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  ScheduleDetail: state.ScheduleDetail
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetailContainer);
