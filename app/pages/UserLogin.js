import Util from '../common/utils';
import NavBar from '../components/NavBar';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import TabBarView from '../containers/TabBarView';





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
      interval: null,
    }

    this._checkCode = this._checkCode.bind(this);

  }

  _onLoginBtn() {
    // if (this.state.pwd.length < 6) {
    //   this.refs.toast.show('密码长度不能小于6位');
    //   return;
    // }
    //
    // if (this.state.mobile.length < 11) {
    //   this.refs.toast.show('手机号码长度不正确');
    //   return;
    // }

    this.props.actions.startUserLogin('18840822722' ,'123465');

    if (this.state.interval == null) {
      this.state.interval = setInterval(this._checkCode, 500);

    }


    // Common.defaultTab ='myAccount';
    // // let selectedTab = {selectedTab: 'hot'};
    // this.props.navigator.push({
    //   // title: '赛事详情',
    //   component: TabBarView,
    //   // passProps: { selectedTab: 'hot'},
    // });

  }

  _checkCode() {
    const { UserLogin } = this.props;
    if (UserLogin.code != -1) {

      clearInterval(this.state.interval);
      this.state.interval = null;

      if (UserLogin.code > 0){
          this.refs.toast.show( UserLogin.msg);
      }
      if (UserLogin.code == 0 ) {
        AsyncStorage.setItem(Common.userToken, UserLogin.userToken);
        console.log(UserLogin.userToken);

        this.props.navigator.pop();

        // Common.defaultTab ='hot';
        //
        // this.props.navigator.push({
        //   component: TabBarView,
        // });


      }
    }

  }



  render() {
    return (
      <View style={styles.container}>
        <NavBar name='登陆' navigator={this.props.navigator}/>

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
        <TouchableOpacity onPress={() => this._onLoginBtn()}>
          <View style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>登    陆</Text>
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
  input: {
    marginTop: 40,

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
    marginTop: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',

  }

  });
export default UserLogin;
