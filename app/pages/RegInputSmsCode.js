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
} from 'react-native';

class RegInputSmsCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elseSecond: 60,
      smsCode: '',
    }
  }

  _elseSecondInterval;

  _onPressNextButton() {
    this.props.actions.verifySmsCode(this.props.mobile, this.state.smsCode);

  }

  componentDidMount() {
    // _elseSecondInterval = setInterval(()=>this.timerElseSecond(),1000);
  }

  componentDidUpdate() {
    const { RegInputSmsCode } = this.props;
    if (RegInputSmsCode.code > 0){
        this.refs.toast.show(RegInputSmsCode.msg);
    }
  }

  timerElseSecond() {

    this.setState({elseSecond: this.state.elseSecond - 1});
    if (this.state.elseSecond <= 0) {
      clearInterval(_elseSecondInterval);
    }



  }






  render() {
    return (
      <View style={styles.container}>
        <Header
          title='填写验证码'
        />
        <View style={styles.tintRow}>
          <Text style={styles.tintRowText}>请输入手机号xxxxxxxxxxxxx收到的短信校验码</Text>
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
            <Text style={styles.rePushBtnText}>{this.state.elseSecond}秒后重新获取</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this._onPressNextButton()}>
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
    // borderWidth: 1,
  },
  rePushBtnText: {
    color: '#bbbbbb',
    fontSize: 13,
  }

});
export default RegInputSmsCode;
