import * as WeChat from 'react-native-wechat';

import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import HTTPUtil from '../../common/utils/HTTPUtil'

import AccountInfoSet from './AccountInfoSet'
import Text from '../../components/Text';


import * as ActionCreator from '../../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  StyleSheet,
  NativeAppEventEmitter,
  AsyncStorage,
  View,
  Image,
  TouchableOpacity,
  NativeModules
} from 'react-native';

class AccountInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isWXAppInstalled: false,
    }
    this._bindWechat = this._bindWechat.bind(this)
    this._goBindWechat = this._goBindWechat.bind(this)
  }

  componentDidMount() {
    WeChat.isWXAppInstalled().then((b)=>this.setState({isWXAppInstalled: b}))
  }

  _navigatorToSetValue(attr,name){
    this.props.navigator.push({
      component: AccountInfoSet,
      passProps: {
        attr: attr,
        name: name,
        setAccountInfo: this.props.actions.setAccountInfo
      }
    })
  }

  _goBindWechat(){
    if (!this.state.isWXAppInstalled) {
      return this.refs.toast.show('本机未安装微信')
    } else {
      let scope = 'snsapi_userinfo'
      let state = 'Saishibao'
      WeChat.sendAuthRequest(scope, state).then((code) => this._bindWechat(code))
    }
  }

  _bindWechat(code) {
    AsyncStorage.getItem(Common.userToken).then((userToken) => {
      let url = 'https://api.91buyin.com/user/info/bind/wechat'
      HTTPUtil.post(url, {code: code}, userToken).then((json) => {
        console.log(json);
        try {
          if (json.code === '0') {
            this.refs.toast.show('绑定成功')
            this.props.actions.updateAccountInfo('wechat_unionid', 'binded')
          } else {
            this.refs.toast.show(json.msg)
          }
        } catch (e) {
          this.refs.toast.show('服务器繁忙，请稍后再试！')
          console.log(e.name)
        }
      },(connect_error)=>{
        console.log(connect_error.msg);
      });
    });
  }

  _renderInfoView() {

    const { info } = this.props.Account.info

    return(
      <View style={styles.main}>
        <View style={styles.infoItems}>
          <View style={[styles.infoItem,styles.headImageItem]}>
            <View
              style={styles.itemLabel}>
              <Text style={styles.labelText}>
                头像
              </Text>
            </View>
            <View style={[styles.itemValue]}>
              <Image style={styles.headImage} source={require('../../imgs/headImage_default.png')}/>
            </View>
          </View>
          <View style={styles.underLine}/>
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                昵称
              </Text>
            </View>
            <TouchableOpacity
              disabled={!!info.rickName}
              onPress={()=>this._navigatorToSetValue('rickName','昵称')}
              style={styles.itemValue}>
              <View style={styles.valueTextView}>
                <Text style={styles.valueText}>
                  {info.rickName ? info.rickName : '未设置'}
                </Text>
              </View>
              {!info.rickName && <View style={styles.itemArrow}>
                <Icon color="#e0eaff" size={16} name="chevron-right"/>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.underLine}/>
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                真实姓名
              </Text>
            </View>
            <TouchableOpacity
              disabled={!!info.realName}
              onPress={()=>this._navigatorToSetValue('realName','真实姓名')}
              style={styles.itemValue}>
              <View style={styles.valueTextView}>
                <Text style={styles.valueText}>
                  {info.realName ? info.realName : '未设置'}
                </Text>
              </View>
              {!info.realName && <View style={styles.itemArrow}>
                <Icon color="#e0eaff" size={16} name="chevron-right"/>
              </View>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spaceBetween}/>
        <View style={styles.infoItems}>
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                手机号
              </Text>
            </View>
            <TouchableOpacity
              disabled={true}
              onPress={()=>this._navigatorToSetValue('mobile','手机号')}
              style={styles.itemValue}>
              <View style={styles.valueTextView}>
                <Text style={styles.valueText}>
                  {info.mobile ? info.mobile : '未设置'}
                </Text>
              </View>
              {!info.mobile && <View style={styles.itemArrow}>
                <Icon color="#e0eaff" size={16} name="chevron-right"/>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.underLine}/>
          {/* <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
            <Text style={styles.labelText}>
            微信号
            </Text>
            </View>
            <TouchableOpacity
            disabled={!!info.wechat_unionid}
            onPress={()=>this._goBindWechat()}
            style={styles.itemValue}>
            <View style={styles.valueTextView}>
            <Text style={styles.valueText}>
            {info.wechat_unionid ? '已绑定': '点击绑定'}
            </Text>
            </View>
            <View style={styles.itemArrow}>
            <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
            </TouchableOpacity>
            </View>
          <View style={styles.underLine}/> */}
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                身份证
              </Text>
            </View>
            <TouchableOpacity
              disabled={!!info.idCard}
              onPress={()=>this._navigatorToSetValue('idCard','身份证')}
              style={styles.itemValue}>
              <View style={styles.valueTextView}>
                <Text style={styles.valueText}>
                  {info.idCard ? info.idCard : '未设置'}
                </Text>
              </View>
              {!info.idCard && <View style={styles.itemArrow}>
                <Icon color="#e0eaff" size={16} name="chevron-right"/>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.underLine}/>
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                护照号码
              </Text>
            </View>
            <TouchableOpacity
              disabled={!!info.passportID}
              onPress={()=>this._navigatorToSetValue('passportID','护照号码')}
              style={styles.itemValue}>
              <View style={styles.valueTextView}>
                <Text style={styles.valueText}>
                  {info.passportID ? info.passportID : '未设置'}
                </Text>
              </View>
              {!info.passportID && <View style={styles.itemArrow}>
                <Icon color="#e0eaff" size={16} name="chevron-right"/>
              </View>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spaceBetween} />
        <View style={styles.infoItems}>
          <View style={[styles.noticeItem]}>
            <View style={styles.notice}>
              <Text style={styles.noticeText}>
                报名参加需完善个人信息
              </Text>
              <Text style={styles.noticeText}>
                请真实录入，一经确定，无法修改
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <NavBar name='我的信息' navigator={this.props.navigator}  />
        <View style={styles.spaceTop} />
        {this._renderInfoView()}
        <Toast ref="toast" position='center'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor
  },
  spaceTop: {
    height: 10,
    backgroundColor: '#FFFFFF'
  },
  spaceBetween: {
    height: 8,
    backgroundColor: '#F2F2F2'
  },
  underLine: {
    height: 1,
    backgroundColor: '#e0eaff'
  },
  main: {
    flex: 1
  },
  infoItems: {
    paddingHorizontal: 20,
    flex: 1,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headImageItem: {
    flex: 1.4,
    justifyContent: 'flex-end'
  },
  headImage: {
    marginTop: -10,
    height: Common.window.height / 8,
    width: Common.window.height / 8,
    resizeMode: Image.resizeMode.contain
  },
  noticeItem: {
    flex: 3
  },
  itemLabel: {
    flex: 4
  },
  itemValue: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242'
  },
  valueTextView: {
    height: Common.window.height * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bbbbbb'
  },
  notice: {
    flex: 1,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom:15,
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeText: {
    margin: 10,
    fontSize: 14,
    fontWeight: '400'
  }
});

const mapStateToProps = (state) => ({
  Account: state.Account
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
