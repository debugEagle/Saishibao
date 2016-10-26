import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'


import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import RegInputSmsCode from './RegInputSmsCode';
import HotList from '../Hot/HotList';

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
} from 'react-native';




class RegGetSmsCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
    }

  }


  _onPressNextBtn() {
    const { TimerElse } = this.props;

    if (this.state.mobile.length < 11) {
      this.refs.toast.show('手机号码长度不正确');
      return;
    }

    if (TimerElse.isRunning) {
      this.refs.toast.show('请稍后再试');
      return;
    }

    this.props.actions.getSmsCode(this.state.mobile, this.props.retrieve, ()=>this._fetchSuccess(), (msg)=>this._fetchFailed(msg));

  }

  _fetchSuccess() {
    this.props.navigator.push({

      component: RegInputSmsCode,
      passProps: {
        mobile: this.state.mobile,
        retrieve: this.props.retrieve
      },
    });
  }

  _fetchFailed(msg) {
    this.refs.toast.show( msg );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar name={this.props.retrieve ? '找回密码' : '注册'} navigator={this.props.navigator}/>

        <View style={styles.input}>

          <View style={styles.inputRowOne}>
            <View style={styles.inputLabel}>
              <Text style={styles.inputLabelText}>国家地区</Text>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.locationText}>中国大陆+86 ></Text>
            </View>
          </View>
          <View style={styles.inputRowTwo}>
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

const mapStateToProps = (state) => ({
  RegGetSmsCode: state.User.RegGetSmsCode,
  TimerElse: state.User.TimerElse,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegGetSmsCode);
