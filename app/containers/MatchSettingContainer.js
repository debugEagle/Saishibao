import React, {
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import * as ActionCreator from '../actions';
import MatchSetting from '../pages/MatchSetting';

class MatchSettingContainer extends Component {
    render() {
        return (
            <MatchSetting {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  MatchSetting: state.MatchSetting
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchSettingContainer);
