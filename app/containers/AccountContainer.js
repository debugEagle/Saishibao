
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Account from '../pages/Account';
import * as ActionCreator from '../actions'

class AccountContainer extends Component {
    render() {
        return (
            <Account {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
  UserLogin: state.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
