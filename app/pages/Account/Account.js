import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import Toast, {DURATION} from 'react-native-easy-toast';
import Common from '../../common/constants';

import UserLogin from '../User/UserLogin';
import AccountInfo from './AccountInfo'
import AccountTicket from './AccountTicket'
import AccountGift from './AccountGift'
import AccountOrder from './AccountOrder'
import AccountContact from  './AccountContact';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';

class Account extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.startUserLoginWithToken();
  }

  _successToNavigator(component) {
    this.props.navigator.push({
        component: component,
    });
  }

  _failedToast(msg){
    this.refs.toast.show(msg);
  }

  _onPressLoginBtn() {
    this.props.navigator.push({
      component: UserLogin,
    });
  }

  _onPressMyInfo() {
    const { actions } = this.props
    actions.fetchAccountInfo(()=>this._successToNavigator(AccountInfo),(msg)=>this._failedToast(msg))
  }

  _onPressMyTicket() {
    this.props.navigator.push({
        component: AccountTicket,
    });
  }

  _onPressMyGift() {
    this.props.navigator.push({
        component: AccountGift,
    });
  }

  _onPressContact() {
    this.props.navigator.push({
        component: AccountContact,
    });
  }

  _onPressMyOrder() {
    this.props.navigator.push({
        component: AccountOrder,
    });
  }

  render() {
    const { UserLogin } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headImage} source={require('../../imgs/headImage_default.png')}/>
        </View>
        <View style={styles.content}>
          <View style={styles.statusArea}>
            {!UserLogin.haveLogined?
              <TouchableOpacity
                style={styles.stateView}
                onPress={() => this._onPressLoginBtn()}>
                <Text style={styles.stateText}>点击登陆</Text>
              </TouchableOpacity>
              :
              <Text style={styles.stateText}>已登陆</Text>
            }
          </View>
          <View style={styles.menuArea}>
            <View style={styles.menuView}>
              <View style={[styles.menuRow, styles.withBorderBottom, {marginTop:35}]}>
                <TouchableOpacity
                  onPress={()=>this._onPressMyInfo()}
                  style={[styles.menuItem, styles.withBorderRight]}>
                  <View style={[styles.menuImageView, {marginLeft: -20}]}>
                    <Image style={styles.menuImage} source={require('../../imgs/account_info.png')}/>
                  </View>
                  <View style={[styles.menuTextView, {marginLeft: -20}]}>
                    <Text style={styles.menuText}>
                      我的信息
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuItem, styles.withBorderRight, {flex: 1.2}]}
                  onPress={()=>this._onPressMyTicket()}>
                  <View style={styles.menuImageView}>
                    <Image style={styles.menuImage} source={require('../../imgs/account_ticket_verification.png')}/>
                  </View>
                  <View style={styles.menuTextView}>
                    <Text style={styles.menuText}>
                      门票验证
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={()=>this._onPressMyOrder()}>
                  <View style={[styles.menuImageView, {marginRight: -20}]}>
                    <Image style={styles.menuImage} source={require('../../imgs/account_orders.png')}/>
                  </View>
                  <View style={[styles.menuTextView, {marginRight: -20}]}>
                    <Text style={styles.menuText}>
                      我的订单
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.menuRow, {marginBottom:35}]}>
                <TouchableOpacity
                  onPress={()=>this._onPressMyGift()}
                  style={[styles.menuItem, styles.withBorderRight]}>
                  <View style={[styles.menuImageView, {marginLeft: -20}]}>
                    <Image style={styles.menuImage} source={require('../../imgs/account_gift.png')}/>
                  </View>
                  <View style={[styles.menuTextView, {marginLeft: -20}]}>
                    <Text style={styles.menuText}>
                      点券兑换
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, styles.withBorderRight, {flex: 1.2}]}>
                  <View style={styles.menuImageView}>
                    <Image style={styles.menuImage} source={require('../../imgs/account_feedback.png')}/>
                  </View>
                  <View style={styles.menuTextView}>
                    <Text style={styles.menuText}>
                      问题反馈
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}
                  onPress={()=>this._onPressContact()}>
                  <View style={[styles.menuImageView, {marginRight: -20}]}>
                    <Image style={styles.menuImage} source={require('../../imgs/account_about.png')}/>
                  </View>
                  <View style={[styles.menuTextView, {marginRight: -20}]}>
                    <Text style={styles.menuText}>
                      关于我们
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.menuSpaceView}>
            </View>
          </View>
        </View>
        <Toast ref="toast" position='bottom'/>
      </View>
    );
  }
}

const headImageWidth = Common.window.width / 5;
const styles = StyleSheet.create({
  withBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#e0eaff'
  },
  withBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
  container: {
    flexDirection: 'column',
    height: Common.window.height - 64,
    backgroundColor: Common.colors.containerBgColor
  },
  header: {
    flex: 1,
    backgroundColor: Common.colors.themeColor,
    zIndex: 99
  },
  headImage: {
    position: 'absolute',
    left: headImageWidth * 2,
    bottom: -headImageWidth / 3,
    width: headImageWidth,
    height: headImageWidth,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: headImageWidth /2,
    backgroundColor: 'white',
    resizeMode: Image.resizeMode.contain
  },
  content: {
    flex: 6,
    zIndex: 9,
    marginHorizontal: 10,
  },
  statusArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateView: {
    width: 140,
    height: 30,
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  stateText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#bbbbbb'
  },
  menuArea: {
    flex: 4,
  },
  menuView: {
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: '#e0eaff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff',
  },
  menuSpaceView: {
    flex: 1
  },
  menuRow: {
    marginHorizontal: 30,
    flex: 1,
    flexDirection: 'row'
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
  },
  menuImageView: {
    alignItems: 'center'
  },
  menuImage: {
    width: headImageWidth / 1.,
    height: headImageWidth / 1.3,
    resizeMode: Image.resizeMode.contain
  },
  menuTextView: {
    marginTop: 5,
    alignItems: 'center'
  },
  menuText: {
    color: '#787878',
    fontSize: 13,
    fontWeight: '500'
  }
});

const mapStateToProps = (state) => ({
  UserLogin: state.User.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Account)
