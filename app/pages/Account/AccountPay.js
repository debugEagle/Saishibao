import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as ActionCreator from '../../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


class AccountPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payNum: 1,
      money: 200,
    }
  }

  _onPressNumCtrl(isAdd) {
    if (isAdd) {
      this.setState({
        payNum: this.state.payNum + 1,
      });
    }
    else {
      if (this.state.payNum > 1) {
        this.setState({
          payNum: this.state.payNum - 1,
        });
      }

    }
  }
  render() {
    return (
      <View style={styles.container}>
      <NavBar name='参加赛事' navigator={this.props.navigator}  />

       <View style={styles.infoArea}>
        <View style={styles.infoDetailArea}>
          <View style={styles.infoSubArea}>
            <View style={styles.infoBackGround}>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.casinoText}>
                北京·扑克俱乐部
              </Text>
            </View>
            <View style={styles.infoImageRow}>
              <Image style={styles.titleImage} source={require('../../imgs/casino_default.png')}/>

            </View>
            <View style={styles.infoRow}>
              <Text style={styles.matchNameText}>
                MTT常规赛
              </Text>
              </View>
          </View>
          <View style={styles.infoSubArea}>
            <View style={styles.payNumRow}>
              <Text style={styles.commonText}>
                购票数量
              </Text>
            </View>
            <View style={styles.payNumCtrlRow}>
              <View style={styles.payNumBlock_left} >
                <TouchableOpacity style={styles.payNumTouch}
                  onPress={() => this._onPressNumCtrl(false)}>
                  <Text style={styles.payNumSymboText}>
                    -
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.payNum}>
                <Text style={styles.payNumSymboText}>
                  {this.state.payNum}
                </Text>
              </View>
              <View style={styles.payNumBlock_right} >
                <TouchableOpacity style={styles.payNumTouch}
                  onPress={() => this._onPressNumCtrl(true)}>
                  <Text style={styles.payNumSymboText}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.payNumRow}>
              <Text style={styles.moneyText} >
                ￥{parseInt(this.state.money) * parseInt(this.state.payNum)}
              </Text>
            </View>
          </View>


        </View>

        <View style={styles.payStyleArea}>
          <View style={styles.payStyleRow}>

            <Text style={styles.payStyleText}>
              付款方式
            </Text>

          </View>
          <View style={styles.payStyle}>
          <Image style={styles.payImage} source={require('../../imgs/pay_wx.png')}/>

          </View>
        </View>

       </View>

       <View style={styles.btnArea}>
         <View style={styles.payBtn}>
          <Text style={styles.payBtnText}>
             购票
          </Text>
         </View>
       </View>
      </View>

    );
  }
}


const marginSize = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor,
  },
  infoBackGround: {
    bottom: 50,
    left: marginSize - (300 / 2 ) -2  ,
    backgroundColor: '#e0eaff',
    width: 600,
    height: 600,
    borderRadius: 300,
    position: 'absolute',
    zIndex: -1,
  },
  infoArea: {
    marginTop: 40,
    margin: marginSize,
    flex: 5,
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 8,
  },
  btnArea: {
    flex: 1,
    marginHorizontal: marginSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ff875c',
    width: Common.window.width - marginSize*2,


  },
  payBtnText: {
    color: '#f7f5f7',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoDetailArea: {
    flex: 4,
    // borderWidth: 1,
  },
  payStyleArea: {
    borderTopWidth: 2,
    borderColor: '#e0eaff',
    marginHorizontal: 30,
    flex: 1.3,
  },

  infoRow: {
    alignItems: 'center',
    justifyContent: 'center',

    // marginTop: 10,
    flex: 1,
    // borderWidth: 1,
  },
  infoImageRow: {
    flex: 2.5,
    alignItems: 'center',
  },
  titleImage: {

    height: 80,
    width: 80,
    resizeMode: Image.resizeMode.contain,

  },
  casinoText: {
    color: '#424242',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'rgba( 0, 0, 0, 0 )',
  },
  matchNameText: {
    color: '#787878',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'rgba( 0, 0, 0, 0 )',
  },
  commonText: {
    color: '#787878',
    fontSize: 15,
  },
  infoSubArea: {
    flex:1,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  payNumCtrlRow: {
    flex: 4,
    // margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  payNumRow: {
    flex: 1,
    // borderWidth: 1,
  },
  payNum: {
    flex: 0.5,
    // width: 10,
    height: 70,
    // backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNumBlock_left: {
    flex: 1,
    alignItems: 'flex-end',
  },
  payNumBlock_right: {
    flex: 1,
  },
  payNumSymboText: {
    fontSize: 34,
    color: '#101010',
  },
  moneyText: {
    fontSize: 19,
    color: '#f24b51',
    fontWeight: 'bold',
  },
  payStyleRow: {
    marginTop: 10,
    alignItems: 'center',
  },
  payStyleText: {
    color: '#787878',
    fontSize: 15,
  },
  payStyle: {
    flex: 1,
    // borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  payImage: {
    height: 60,
    width: 60,
  },
  payNumTouch: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default AccountPay ;
