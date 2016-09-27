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
import HotIntro from '../pages/HotIntro';

class HotIntroContainer extends Component {
    render() {
        return (
            <HotIntro {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  HotIntro: state.HotIntro
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HotIntroContainer);
