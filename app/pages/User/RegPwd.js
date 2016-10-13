import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'


import Util from '../../common/utils';
import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import RegSuccess  from './RegSuccess';

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

class RegPwd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pwd : '',
      token: '',
    }


  }

  componentWillMount() {
    AsyncStorage.getItem(Common.token)
      .then((value) => {
        console.log('token ' + value);
        this.setState({token: value});
        console.log('this.state.token ' + this.state.token);

      });
  }

  _onPressNextBtn() {
    // console.log('111');
    if (this.state.pwd.length < 6) {
      this.refs.toast.show('密码长度不能小于6位');
      return;
    }

    console.log('mobile ' + this.props.mobile);
    this.props.actions.setRegPwd(this.props.mobile, this.state.pwd, this.state.token, (token)=>this._fetchSuccess(token), (msg)=>this._fetchFailed(msg));

  }

  _fetchSuccess(token) {
    AsyncStorage.setItem(Common.userToken,token).then(()=>{
      this.props.navigator.push({
        component: RegSuccess,
      });
    })
  }



  _fetchFailed(msg) {
    this.refs.toast.show( msg );
  }

  render() {
    const { TimerElse } = this.props;

    return (
      <View style={styles.container}>
        <NavBar name='输入密码' navigator={this.props.navigator}/>
        <View style={styles.tintRow}>
          <Text style={styles.tintRowText}>请输入6位数账号密码</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>输入密码</Text>
          </View>
          <View style={styles.inputBlock}>
            <TextInput style = {styles.inputSmsCode}
              ref="1"
              multiline={false}
              autoFocus={true}
              placeholder= "请输入密码"
              keyboardType= 'ascii-capable'
              maxLength={6}
              password={true}
              onChange={(event) => { this.state.pwd = event.nativeEvent.text}}

            />
          </View>

        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={() => this._onPressNextBtn()}>
          <Text style={styles.nextBtnText}>下一步</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  tintRow: {
    marginTop: 40,
  },
  tintRowText: {
    fontSize: 14,
    color: '#bbbbbb',
  },
  inputRow: {
    marginTop: 30,
    height: 50,
    width: Common.window.width - inputPadding*2,
    borderRadius: 8,
    borderColor: '#e0eaff',
    borderWidth: 1,
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  nextBtn: {
    width: 260,
    height: 46,
    backgroundColor: '#5c6bc0',
    marginTop: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',


  },
  inputLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    // borderWidth: 1,
  },
  inputLabelText: {
    fontSize: 14,
    color: '#787878',
    fontWeight: 'bold',
  },
  inputBlock: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputSmsCode: {
    flex: 1,

    // borderWidth: 1,
    margin:10,
    fontSize: 20,
    // alignSelf: 'center'
    // alignItems: 'flex-end',
  },
  rePushBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e0eaff',
    borderLeftWidth: 1,
    width: 80,
    // backgroundColor: 'blue'
  },
  rePushBtnText: {
    color: '#bbbbbb',
    // color: Common.colors.themeColor,
    fontSize: 13,
  },

  });

const mapStateToProps = (state) => ({
  RegPwd: state.User.RegPwd,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegPwd);
