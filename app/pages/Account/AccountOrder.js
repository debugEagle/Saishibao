import Common from '../../common/constants';
import NavBar from '../../components/NavBar';
import TabBarInner from '../../components/TabBarInner'
import PullRefreshScrollView from '../../common/pullRefresh';
import * as ActionCreator from '../../actions'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

const mockData = [
  {
    serialNumber_id: 309,
    have_used: false,
    used_time: null,
    valid: true,
    create_time: '2016-09-13T22:59:04+08:00',
    expire_time: null,
    seria_No: 'IGGXZ4ZI',
    desc: '澳大利亚CROWN CASINO <Western Classic Poker Championships 2016> * 25'
  },
  {
    serialNumber_id: 309,
    have_used: false,
    used_time: null,
    valid: true,
    create_time: '2016-09-13T22:59:04+08:00',
    expire_time: null,
    seria_No: 'IGGXZ4ZI',
    desc: '澳大利亚CROWN CASINO <Western Classic Poker Championships 2016> * 25'
  },
  {
    serialNumber_id: 309,
    have_used: false,
    used_time: null,
    valid: true,
    create_time: '2016-09-13T22:59:04+08:00',
    expire_time: null,
    seria_No: 'IGGXZ4ZI',
    desc: '澳大利亚CROWN CASINO <Western Classic Poker Championships 2016> * 25'
  },
  {
    serialNumber_id: 309,
    have_used: false,
    used_time: null,
    valid: true,
    create_time: '2016-09-13T22:59:04+08:00',
    expire_time: null,
    seria_No: 'IGGXZ4ZI',
    desc: '澳大利亚CROWN CASINO <Western Classic Poker Championships 2016> * 25'
  },
]

class AccountOrder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    }
  }

  _renderTicket(ticket) {

    return (
      <TouchableOpacity style={styles.ticket}>
        <Image style={styles.ticketBgImg} source={require('../../imgs/account_order_bg.png')}>
          <View style={styles.ticketInfo}>
            <View style={styles.ticketInfo_left}>
              <View style={styles.ticketInfo_left_name}>
                <Text style={styles.ticketTitleText}>京扑克俱乐部</Text>
              </View>
              <View style={styles.ticketInfo_left_detail}>
                <Text style={styles.ticketInfoText}>晚场暖身赛</Text>
                <Text style={styles.ticketInfoText}>2016.6.25</Text>
              </View>
            </View>
            <View style={styles.ticketInfo_right}>
                <Text style={styles.ticketMoneyText}>200元</Text>

            </View>
          </View>
          <View style={styles.ticketSerial}>
            <Text style={styles.ticketSerialText}>订单号: 1234567890</Text>
          </View>

        </Image>
      </TouchableOpacity>
    )
  }

  _renderOrders(orders) {

    return (
      <ListView

        dataSource={this.state.dataSource.cloneWithRows(orders)}
        renderRow={this._renderTicket.bind(this)}
        initialListSize={15}
        style={styles.orders}
        enableEmptySections={true}/>
    )
  }

  _renderScrollTabView() {

    return (
      <ScrollableTabView style={{
        marginTop: 10,
      }} renderTabBar={() => <TabBarInner tabNames={['未支付', '已支付']}/>}>
        <View tabLabel='false' style={{flex: 1}}>
          {this._renderOrders(mockData)}
        </View>
        <View tabLabel='true' style={{flex: 1}}>
          {this._renderOrders(mockData)}
        </View>
      </ScrollableTabView>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <NavBar name='我的订单' navigator={this.props.navigator}/>
        {this._renderScrollTabView()}
      </View>
    );
  }
}

const ticketBgImgWidth = Common.window.width / 1.1;
const ticketBgImgHeight = ticketBgImgWidth / 2.4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor
  },
  orders: {
    marginTop: 15,
  },
  ticket: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ticketBgImg: {
    height: ticketBgImgHeight,
    width: ticketBgImgWidth,
    resizeMode: Image.resizeMode.contain,
    // flexDirection: 'row',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  ticketInfo: {
    flex: 2.1,
    // borderWidth: 1 ,
    flexDirection: 'row',
    // paddingTop: 20,
    // backgroundColor: 'red',
  },
  ticketSerial: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketInfo_left: {
    // borderWidth: 1,
    flex: 1.5,
    paddingTop: 20,
  },
  ticketInfo_right: {
    paddingTop: 20,

    // borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketInfo_left_name: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    flex: 1,
  },
  ticketInfo_left_detail: {
    alignItems: 'center',
    // borderWidth: 1,
    flex: 1,

  },
  ticketTitleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#636363',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  ticketInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#787878',
    backgroundColor: 'rgba(0, 0, 0, 0)',

  },
  ticketMoneyText: {
    color: '#ff875c',
    fontSize: 20,
    fontWeight: 'bold',

  },
  ticketSerialText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#636363',
  }


});

export default AccountOrder
