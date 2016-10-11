import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import { Util } from '../../common/utils';
import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import RegPwd from './RegPwd';

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
} from 'react-native';

class RegInputSmsCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elseSecond: 60,
      smsCode: '',
      interval: null,
      intervalRePush: null,
    }

    this._checkCode_rePush = this._checkCode_rePush.bind(this);
  }

  _elseSecondInterval;

  _onPressNextBtn() {



    if (this.state.smsCode.length < 4) {
      this.refs.toast.show('校验码长度不正确');
      return;
    }
    this.props.actions.verifySmsCode(this.props.mobile, this.state.smsCode, (token)=>this._fetchSuccess(token), (msg)=>this._fetchFailed(msg));

  }

  _fetchSuccess(token) {
    AsyncStorage.setItem(Common.token, token);
    this.props.navigator.push({

      component: RegPwd,
      passProps: {
        mobile: this.props.mobile,
      },
    });

  }



  _fetchFailed(msg) {
    this.refs.toast.show( msg );


  }

  //重发验证码
  _onPressRePushBtn() {
    this.props.actions.getSmsCode(this.props.mobile);
    this.props.actions.startTimer();

    if (this.state.intervalRePush == null) {
      this.state.intervalRePush = setInterval(this._checkCode_rePush, 500);

    }
  }
  componentDidMount() {
    // _elseSecondInterval = setInterval(()=>this.timerElseSecond(),1000);
    this.props.actions.startTimer();
  }



  _checkCode_rePush() {
    const { RegGetSmsCode } = this.props;
    if (RegGetSmsCode.code != -1) {

      clearInterval(this.state.intervalRePush);
      this.state.intervalRePush = null;

      if (RegGetSmsCode.code > 0){
          this.refs.toast.show(RegGetSmsCode.msg);
      }

    }

  }









  render() {
    const { TimerElse } = this.props;

    return (
      <View style={styles.container}>
        <NavBar title='填写验证码' navigator={this.props.navigator}/>
        <View style={styles.tintRow}>
          <Text style={styles.tintRowText}>请输入手机号{this.props.mobile}收到的短信校验码</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>校验码</Text>
          </View>
          <View style={styles.inputBlock}>
            <TextInput style = {styles.inputSmsCode}
              ref="1"
              multiline={false}
              autoFocus={true}
              placeholder= "请输入校验码"
              keyboardType= 'number-pad'
              maxLength={4}
              onChange={(event) => { this.state.smsCode = event.nativeEvent.text}}

            />
          </View>
          <View style={styles.rePushBtn}>
            {TimerElse.isRunning?
              <Text style={styles.rePushBtnText}>{TimerElse.elseSeconds}秒后重新获取</Text>
              :<TouchableOpacity onPress={() => this._onPressRePushBtn()}>
                <Text style={[ styles.rePushBtnText, {color: Common.colors.themeColor}]}>重新获取</Text>
              </TouchableOpacity>
            }
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
  RegGetSmsCode: state.User.RegGetSmsCode,
  RegInputSmsCode: state.User.RegInputSmsCode,
  TimerElse: state.User.TimerElse,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegInputSmsCode);
