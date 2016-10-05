import Util from '../common/utils';
import Header from '../components/Header';
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

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      pwd: '',
    }
  }

  _onLoginBtn() {

  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          title='登陆'
        />

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
              autoFocus={true}
              placeholder= "请输入密码"
              keyboardType= 'number-pad'
              maxLength={6}
              password={true}
              onChange={(event) => {
                this.state.mobile = event.nativeEvent.text;
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
