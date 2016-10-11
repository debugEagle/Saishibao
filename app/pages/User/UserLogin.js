import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import Util from '../../common/utils';
import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import TabBarView from '../../containers/TabBarView';
import RegGetSmsCode from './RegGetSmsCode';


import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Navigator,
  SegmentedControlIOS,
  ScrollView,
  Animated,
  Easing,
  TextInput,
  AsyncStorage,
} from 'react-native'

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      pwd: '',
    }

    this._checkCode = this._checkCode.bind(this);

  }

  _onLoginBtn() {
    if (this.state.pwd.length < 6) {
      this.refs.toast.show('密码长度不能小于6位');
      return;
    }

    if (this.state.mobile.length < 11) {
      this.refs.toast.show('手机号码长度不正确');
      return;
    }
    this.props.actions.startUserLogin(this.state.mobile, this.state.pwd, ()=>this._checkCode(), ()=>this._checkCode());
  }

  _onRegBtn() {
    this.props.navigator.push({
      component: RegGetSmsCode,

    });
  }

  _checkCode() {
    const { UserLogin } = this.props;
    if (UserLogin.code != -1) {

      if (UserLogin.code > 0){
          this.refs.toast.show( UserLogin.msg);
      }
      if (UserLogin.code == 0 ) {
        AsyncStorage.setItem(Common.userToken, UserLogin.userToken);
        console.log(UserLogin.userToken);
        this.props.navigator.pop();
      }
    }

  }

  render() {
    return (
      <View style={styles.container}>

        <NavBar name='登陆' navigator={this.props.navigator}/>

        <View >
        <View style={styles.linkReg}>
        <TouchableOpacity onPress={() => this._onRegBtn()}>
          <Text style={styles.linkRegText}>
            注     册
          </Text>
        </TouchableOpacity>
        </View>

        </View>



        <View style={styles.input}>

          <View style={styles.inputRowOne}>
            <View style={styles.inputLabel}>
              <Text style={styles.inputLabelText}>手机号码</Text>
            </View>
            <View style={styles.inputBlock}>
            <TextInput style = {styles.inputMobile}
              ref="1"
              multiline={false}
              autoFocus={true}
              placeholder= "请输入手机号码"
              keyboardType= 'number-pad'
              maxLength={11}
              onChange={(event) => {
                this.state.mobile = event.nativeEvent.text;
              }}

            />
            </View>
          </View>
          <View style={styles.inputRowTwo}>
            <View style={styles.inputLabel}>
              <Text style={styles.inputLabelText}>输入密码</Text>
            </View>
            <View style={styles.inputBlock}>
            <TextInput style = {styles.inputMobile}
              ref="1"
              multiline={false}
              //autoFocus={true}
              placeholder= "请输入密码"
              keyboardType= 'ascii-capable'
              maxLength={6}
              password={true}
              onChange={(event) => {
                this.state.pwd = event.nativeEvent.text;
              }}

            />
            </View>
          </View>
        </View>




        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity style={styles.nextBtn} onPress={() => this._onLoginBtn()}>
            <Text style={styles.nextBtnText}>登        陆</Text>
          </TouchableOpacity>
        </View>

        <Toast ref="toast" position='top'/>
      </View>

    );
  }
  }

  const inputPadding = 18;
  const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
  },
  input: {
    marginTop: 40,
    marginHorizontal: inputPadding,
    height: 100,
    width: Common.window.width - inputPadding * 2,
    borderRadius: 8,
    borderColor: '#e0eaff',
    borderWidth: 1,
  },
  inputRowOne: {
    flex: 1,
    borderColor: '#e0eaff',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  inputRowTwo: {
    flex: 1,
    flexDirection: 'row',
  },
  inputLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  inputLabelText: {
    fontSize: 14,
    color: '#787878',
    fontWeight: 'bold',
  },
  inputBlock: {
    flex: 1,

    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#e0e0e0',
  },
  inputMobile: {
    flex: 1,
    fontSize: 20,
  },
  nextBtn: {
    width: 260,
    height: 46,
    backgroundColor: '#5c6bc0',
    marginTop: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',

  },
  linkReg: {
    position: 'absolute',
    marginTop: 10,
    marginBottom: 10,
    left: 200,
    // borderWidth: 1,
    left: Common.window.width - 80,
  },
  linkRegText: {
    color: '#5c6bc0',
  }

  });

const mapStateToProps = (state) => ({
  UserLogin: state.User.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
