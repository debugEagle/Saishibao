
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import UserLogin from '../pages/UserLogin';
import * as ActionCreator from '../actions'

class UserLoginContainer extends Component {
    render() {
        return (
            <UserLogin {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  UserLogin: state.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginContainer);
