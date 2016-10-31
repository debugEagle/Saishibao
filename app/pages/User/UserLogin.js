import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'


import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import TabBarView from '../../containers/TabBarView';
import RegGetSmsCode from './RegGetSmsCode';
import Text from '../../components/Text';



import React, { Component } from 'react';
import {
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
    this.props.actions.startUserLogin(this.state.mobile, this.state.pwd, (userToken)=>this._fetchSuccess(userToken), (msg)=>this._fetchFailed(msg));
  }

  _fetchSuccess(userToken) {
    AsyncStorage.setItem(Common.userToken, userToken);
    this.props.navigator.resetTo({component: TabBarView, passProps:{page:3}});
    console.log(userToken);
  }

  _fetchFailed(msg) {
    this.refs.toast.show( msg );
  }

  _onRegBtn(retrieve) {
    this.props.navigator.push({
      component: RegGetSmsCode,
      passProps: {
        retrieve,
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <NavBar name='登录' navigator={this.props.navigator}/>
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

        <View style={styles.bottomArea}>
          <TouchableOpacity style={styles.nextBtn} onPress={() => this._onLoginBtn()}>
            <Text style={styles.nextBtnText}>登        录</Text>
          </TouchableOpacity>
          <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this._onRegBtn(retrieve=true)}>
              <Text style={{ color: '#aaaaaa' }}>
                忘记密码？
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._onRegBtn()}>
              <Text style={{ color: '#5c6bc0' }}>
                快速注册
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Toast ref="toast" position='top'/>
      </View>
    );
  }
}

const inputPadding = 18;
const styles = StyleSheet.create({
container: {
  flex: 1,
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
bottomArea: {
  flex: 1,
  width: Common.window.width - inputPadding * 2,
  marginLeft: inputPadding
},
nextBtn: {
  width: Common.window.width - inputPadding * 2,
  height: 46,
  backgroundColor: '#5c6bc0',
  marginTop: 30 ,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center'
},
nextBtnText: {
  fontSize: 14,
  color: '#ffffff',
  fontWeight: 'bold',
},

});

const mapStateToProps = (state) => ({
  UserLogin: state.User.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
