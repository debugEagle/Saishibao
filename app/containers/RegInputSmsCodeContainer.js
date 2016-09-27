
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RegInputSmsCode from '../pages/RegInputSmsCode';
import * as ActionCreator from '../actions'

class RegInputSmsCodeContainer extends Component {
    render() {
        return (
            <RegInputSmsCode {...this.props} />
        )
    }
}
const mapStateToProps = (state) => ({
  RegGetSmsCode: state.RegGetSmsCode,
  RegInputSmsCode: state.RegInputSmsCode,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegInputSmsCodeContainer);
