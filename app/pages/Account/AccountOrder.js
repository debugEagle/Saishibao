import Common from '../../common/constants';
import NavBar from '../../components/NavBar';
import TabBarInner from '../../components/TabBarInner'
import PullRefreshLoadmoreScrollView from '../../components/PullRefreshLoadmore';
import * as ActionCreator from '../../actions'
import Toast, {DURATION} from 'react-native-easy-toast';
import AccountTicket from '../Account/AccountTicket'

import moment from '../../common/utils/moment'

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
    order_id: 95,
    order_No: "01147650016124203001",
    quantity: 2,
    desc: "北京跑跑俱乐部 <MTT常规赛> x 2",
    have_pay: false,
    rel_discount: 1,
    abs_discount: 0,
    amount: 400,
    create_time: "2016-10-15T10:56:01+08:00",
    last_update: "2016-10-15 10:56:01",
    bigMatch_id: null,
    dailyMatch_id: 42,
    user_id: 3,
    casinoName: "北京跑跑俱乐部",
    matchName: "MTT常规赛"
  }
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

  _onPressPayBtn(orderId) {
    const { Pay } = this.props;
    console.log('orderId ' + orderId);
    this.props.actions.fetchUserPayOrder(orderId, ()=>this._userPayOrderSuccess(),()=>{}, (msg)=>this._fetchFailed(msg));
  }

  _userPayOrderSuccess() {
    console.log('success');
    const { actions } = this.props
    actions.fetchAccountTicket({start: true,used: 0,offset: 0,limit: 10},
      this.userPayOrderSuccess())
  }

  userPayOrderSuccess() {
    this.props.navigator.immediatelyResetRouteStack([
      {
        component: TabBarView,
        passProps: {
          page: 3
        }
      },
      {
        component: AccountTicket
      }
    ]);
  }
  _fetchFailed(msg) {
    this.refs.toast.show(msg);
  }

  _onRefresh() {
    let args = {
      start: true,
      offset: 0,
      limit: 10
    }
    this.props.actions.fetchAccountOrder(args);
  }

  _onLoadmore() {
    let args = {
      start: false,
      offset: this.props.orders.orders.length,
      limit: 10
    }
    this.props.actions.fetchAccountOrder(args);
  }

  _renderOrder(order) {

    return (
      <View style={styles.order}>
        <Image style={styles.orderBgImg} source={require('../../imgs/account_order_bg.png')}>
          <View style={styles.content}>
            <View style={styles.order_Top}>
              <Text style={styles.orderSerialText}>订单号: {order.order_No}</Text>
            </View>
            <View style={styles.orderInfo}>
              <View style={styles.orderInfo_left}>
                <View style={styles.orderInfo_left_name}>
                  <Text style={styles.orderTitleText}>{order.casinoName}</Text>
                </View>
                <View style={styles.orderInfo_left_detail}>
                  <Text style={styles.orderInfoText}>{order.matchName}</Text>
                  <Text style={styles.orderInfoText}></Text>
                </View>
              </View>
              <View style={styles.orderInfo_right}>
                <Text style={styles.orderMoneyText}>{order.amount}元</Text>
              </View>
            </View>
            <View style={styles.order_bottom}>
              <View style={styles.orderTime}>
                <Text style={styles.orderTimeText}>订单时间: {moment(order.create_time).format('YYYY-MM-DD hh:mm:ss')}</Text>
              </View>
              {order.have_pay
                ?
                  <View style={[styles.orderBtn,{backgroundColor: '#e1e3e7'}]}>
                    <Text style={[styles.orderBtnText,{color:'#787878'}]}>支付完成</Text>
                  </View>
                :
                <View style={[styles.orderBtn,{backgroundColor: '#ff7825'}]}>
                  <TouchableOpacity style={styles.orderBtnView} onPress={()=>this._onPressPayBtn(order.order_id) }>
                    <Text style={[styles.orderBtnText,{color:'white'}]}>立即支付</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </Image>
      </View>
    )
  }

  _renderOrders(orders) {
    const listHeight = orders.orders.length * 150
    const viewHeight = Common.window.height - 64

    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(orders.orders)}
        renderRow={this._renderOrder.bind(this)}
        initialListSize={1000}
        style={styles.orders}
        renderScrollComponent={
          (props) =>
            <PullRefreshLoadmoreScrollView
              onRefresh={()=>this._onRefresh(true)}
              onLoadmore={()=>this._onLoadmore(true)}
              listHeight={listHeight}
              viewHeight={viewHeight}
              status={orders.status}/>}
        enableEmptySections={true}/>
    )
  }

  render() {
    const orders = this.props.orders

    return (
      <View style={styles.container}>
        <NavBar name='我的订单' navigator={this.props.navigator}/>
        {this._renderOrders(orders)}
        <Toast ref="toast" position='center'/>
      </View>
    );
  }
}

const orderBgImgWidth = Common.window.width / 1.1;
const orderBgImgHeight = orderBgImgWidth / 2.4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 5
  },
  orders: {
    marginTop: 15,
  },
  order: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderBgImg: {
    height: orderBgImgHeight,
    width: orderBgImgWidth,
    resizeMode: Image.resizeMode.contain,
  },
  order_Top: {
    marginTop: 0,
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  orderTimeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636363',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  orderSerialText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#787878',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  orderInfo: {
    flex: 1.5,
    flexDirection: 'row',
  },
  order_bottom: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo_left: {
    flex: 1.5,
  },
  orderInfo_right: {
    paddingLeft: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo_left_name: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  orderInfo_left_detail: {
    alignItems: 'center',
    flex: 1,
  },
  orderTitleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#636363',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  orderInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#787878',
    backgroundColor: 'rgba(0, 0, 0, 0)',

  },
  orderMoneyText: {
    color: '#ff875c',
    fontSize: 20,
    fontWeight: 'bold',

  },
  orderBtn: {
    marginRight: 5,
    height: 20,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  }
});

const mapStateToProps = (state) => ({
  orders: state.Account.orders,
  Pay: state.Account.Pay,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrder)
