
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RegGetSmsCode from '../pages/RegGetSmsCode';
import * as ActionCreator from '../actions'

class RegGetSmsCodeContainer extends Component {
    render() {
        return (
            <RegGetSmsCode {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  RegGetSmsCode: state.RegGetSmsCode
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegGetSmsCodeContainer);
