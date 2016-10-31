/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import Text from '../../components/Text';

import React, { Component } from 'react'
import {
  AppRegistry,
  NativeAppEventEmitter,
  requireNativeComponent,
  NativeModules,
  StyleSheet,
  View,
  ScrollView,
  AlertIOS,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
} from 'react-native'

import Common from '../../common/constants';


function show(title, msg) {
    console.log(title+'', msg+'')
    AlertIOS.alert(title+'', msg+'')
}

/* 地图 */
//var AMap = requireNativeComponent('AMap', null)



/* 微信 */
const WeChatAPI = NativeModules.WeChatAPI


/* httpx 返回状态码
res = {
    code: 'int, 状态码',
    raw: 'string, 返回值',
    headers: 'array, headers',
    cookies: 'array, cookies',
    json
}
*/

const httpx = NativeModules.httpx


class WxTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
          installed: false,
          code :'',
          userToken: '',
        }

        this.bindWx =this.bindWx.bind(this);

        /* 监听回调 */
        var listener = NativeAppEventEmitter.addListener(
            'WeChat.Resp',
            (body) => {
                switch (body.type) {
                    /* 支付回调 */
                    case 'WeChat.Resp.Pay':
                        show('支付结果!', 'errCode:' + body.errCode)
                        show('支付结果!', 'returnKey:' + body.returnKey)
                        break;
                    /* 登陆回调 */
                    case 'WeChat.Resp.Auth':
                        // this.getUserInfoFromWx(body.code)
                        // console.log('code ' + body.code );
                        this.setState({
                          code: body.code,
                        })



                        show('登陆回调', 'code:' + body.code);
                        break;
                    default:
                      show('body.type ' + body.type);

                }
            }
        )
    }

    registerWx() {
        WeChatAPI.registerWx((b) => show('微信注册', 'registerWx:' + b))
    }

    isWXAppInstalled() {
        WeChatAPI.isWXAppInstalled((b) => show('是否安装微信', 'isWXAppInstalled:' + b))
    }

    isWXAppSupportApi() {
        WeChatAPI.isWXAppSupportApi((b) => show('是否支持api', 'isWXAppSupportApi:' + b))
    }

    getApiVersion() {
        WeChatAPI.getApiVersion((v) => show('api版本', 'getApiVersion:' + v))
    }

    getWXAppInstallUrl() {
        WeChatAPI.getWXAppInstallUrl((url) => show('微信安装地址', 'getWXAppInstallUrl:' + url))
    }

    openWXApp() {
        WeChatAPI.openWXApp((b) => show('打开微信', 'openWXApp:' + b))
    }

    sendAuthReq() {
        let scope = 'snsapi_userinfo'
        let state = '13585702802'
        WeChatAPI.sendAuthReq(scope, state, (b) => show('微信登陆', 'sendAuthReq:' + b))
    }

    buy() {
        httpx.request({
            url: 'https://api.91buyin.com/buy',
            method: 'POST',
            timeout: 5
        }, (error, res) => {
            if (error) {
                show('购买失败:', error)
                return
            }
            console.log(res.json)
            WeChatAPI.pay(res.json, (b) => show('发送付款命令', 'pay:' + b))
        })
    }

    getUserInfoFromWx(code) {
        console.log('code:', code)
        this.setState({
          code: code,
        })
        httpx.request({
            // url: 'https://api.91buyin.com/users/wxlogin',
            url: 'https://api.91buyin.com/user/thirdparty/wechat/login',
            method: 'POST',
            timeout: 5,
            post: {code: code}
        }, (error, res) => {
            if (error) {
                show('获取用户信息失败:', error)
                return
            }
            // let { token } = (res.json);
            this.setState({
              userToken: res.json.value.token,
            })
            show('获取用户信息:', JSON.stringify(res.json));
        })
    }

    bindWx() {
        show('code&token :', this.state.code + '   ' + this.state.userToken);

        AsyncStorage.getItem(Common.userToken).then((userToken) => {
        httpx.request({
            // url: 'https://api.91buyin.com/users/wxlogin',
            url: 'https://api.91buyin.com/user/info/bind/wechat',
            method: 'POST',
            timeout: 5,
            post: {code: this.state.code},
            header: {
              'authorization': 'Bearer ' + userToken,
              'Content-Type': 'application/json'
            },


        }, (error, res) => {
            if (error) {
                show('bind失败:', error)
                return
            }
            console.log(res.json);
            show('bind, 获取用户信息:',JSON.stringify(res.json));
        })
        });

    }



    render() {
        return (
            <ScrollView contentContainerStyle={styles.wrapper}>

                <Text style={styles.pageTitle}>微信 && 高德测试</Text>
                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.registerWx}>
                    <Text style={styles.buttonTitle}>registerApp</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.isWXAppInstalled}>
                    <Text style={styles.buttonTitle}>isWXAppInstalled</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.isWXAppSupportApi}>
                    <Text style={styles.buttonTitle}>isWXAppSupportApi</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.getApiVersion}>
                    <Text style={styles.buttonTitle}>getApiVersion</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.getWXAppInstallUrl}>
                    <Text style={styles.buttonTitle}>getWXAppInstallUrl</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.openWXApp}>
                    <Text style={styles.buttonTitle}>openWXApp</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.sendAuthReq}>
                    <Text style={styles.buttonTitle}>sendAuthReq</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.buy}>
                    <Text style={styles.buttonTitle}>buy / pay</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.bindWx}>
                    <Text style={styles.buttonTitle}>绑定</Text>
                </TouchableHighlight>



            </ScrollView>
        )
    }
}



let styles = StyleSheet.create({
    wrapper: {
        paddingTop: 30,
        paddingBottom: 0,
        alignItems: 'center',
    },
    pageTitle: {
        paddingBottom: 10
    },
    button: {
        width: 200,
        height: 25,
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#f38',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
      height:220,
      width:Dimensions.get('window').width - 20,
    },
    buttonTitle: {
        fontSize: 14,
        color: '#fff'
    }
})

export default WxTest;
