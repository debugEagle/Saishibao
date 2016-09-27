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
import HotDayInfo from '../pages/HotDayInfo';

class HotDayInfoContainer extends Component {
    render() {
        return (
            <HotDayInfo {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  HotDayInfo: state.HotDayInfo
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HotDayInfoContainer);
