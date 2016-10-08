import Util from '../common/utils';
import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import HotListContainer from '../containers/HotListContainer';
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

class RegSuccess extends Component {
  constructor(props) {
    super(props);
  }

  _onPressLaterBtn() {

    Common.defaultTab ='myAccount';
    this.props.navigator.push({
      // title: '赛事详情',
      component: TabBarView,
      // passProps: { hotIntro, hotMatch },
    });
  }

  _onPressCompleteBtn() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title='注册成功'
        />
        <View style={styles.infoArea}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              提示信息
            </Text>
          </View>
          <View style={styles.detail}>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>
                报名参赛需完善个人信息
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>
                国内赛事完善真实姓名、昵称、手机
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailText}>
                国际赛事需完善护照号
              </Text>
            </View>

          </View>
        </View>

        <View style={styles.btnArea}>
          <View style={styles.btnBlock}>
            <TouchableOpacity  style={styles.nextBtn} onPress={() => this._onPressCompleteBtn()}>
              <Text style={styles.nextBtnText}>完善信息</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnBlock}>
            <TouchableOpacity style={styles.nextBtn} onPress={() => this._onPressLaterBtn()}>
              <Text style={styles.nextBtnText}>以后填写</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  infoArea: {
    marginTop: 40,
    height: 170,
    width: Common.window.width - inputPadding * 2,
    borderRadius: 8,
    borderColor: '#e0eaff',
    borderWidth: 2,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e0eaff',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#787878',
  },
  detail: {
    padding:20,
    flex: 3,
  },
  detailRow: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#787878',
  },
  btnArea: {
    flexDirection: 'row',
  },
  btnBlock:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nextBtn: {
    width: 100,
    height: 32,
    backgroundColor: '#5c6bc0',
    marginTop: 30,
    // marginRight: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',

  },
  nextBtnText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',


  },
});

export default RegSuccess;
