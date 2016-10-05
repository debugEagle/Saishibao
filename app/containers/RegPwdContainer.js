
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RegPwd from '../pages/RegPwd';
import * as ActionCreator from '../actions'

class RegPwdContainer extends Component {
    render() {
        return (
            <RegPwd {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  RegPwd: state.RegPwd,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegPwdContainer);
