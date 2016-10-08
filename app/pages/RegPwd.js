import Util from '../common/utils';
import NavBar from '../components/NavBar';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';





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
      interval: null,
    }

    this._checkCode = this._checkCode.bind(this);
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
    this.props.actions.setRegPwd(this.props.mobile, this.state.pwd, this.state.token);
    if (this.state.interval == null) {
      this.state.interval = setInterval(this._checkCode, 500);

    }

  }


  _checkCode() {
    const { RegPwd } = this.props;
    if (RegPwd.code != -1) {

      clearInterval(this.state.interval);
      this.state.interval = null;

      if (RegPwd.code > 0){
          this.refs.toast.show(RegPwd.msg);
      }
      if (RegPwd.code == 0 ) {
        console.log('goto');
        // AsyncStorage.setItem(Common.token, RegPwd.token);
        //
        // this.props.navigator.push({
        //
        //   component: RegPwdContainer,
        //   passProps: {
        //     mobile: this.props.mobile,
        //   },
        // });
      }
    }

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
              keyboardType= 'number-pad'
              maxLength={6}
              password={true}
              onChange={(event) => { this.state.pwd = event.nativeEvent.text}}

            />
          </View>

        </View>
        <TouchableOpacity onPress={() => this._onPressNextBtn()}>
          <View style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>下一步</Text>
          </View>
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
export default RegPwd;
