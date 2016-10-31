import Common from '../../common/constants';
import moment from '../../common/utils/moment'
import NavBar from '../../components/NavBar';
import TabBarInner from '../../components/TabBarInner'
import PullRefreshLoadmoreScrollView from '../../components/PullRefreshLoadmore';
import * as ActionCreator from '../../actions';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Text from '../../components/Text';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

const mockData = [
  {
    "serialNumber_id": 310,
    "have_used": false,
    "used_time": null,
    "valid": true,
    "create_time": "2016-09-13T22:59:04+08:00",
    "expire_time": null,
    "seria_No": "NR4R7RWS",
    "desc": "澳大利亚CROWN CASINO <Western Classic Poker Championships 2016> * 25",
    "orderDetail": {
      "orderDetail_id": 324,
      "order": {
        "bigMatch_id": 4,
        "dailyMatch_id": null
      }
    },
    "casinoName": "CROWN CASINO",
    "matchName": "Western Classic Poker Championships 2016"
  }
]

class AccountTicket extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource_unused: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      dataSource_used: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount() {
    let args = {
      start: true,
      used: 1,
      offset: 0,
      limit: 10
    }
    const { actions } = this.props
    actions.fetchAccountTicket(args)
  }

  _renderTicket(ticket) {

    return (
      <TouchableOpacity style={styles.ticket}>
        <Image style={styles.ticketBgImg} source={require('../../imgs/account_ticket_bg.png')}>
          <View style={styles.ticketTitle}>
            <Text style={styles.ticketTitleText}>
              {ticket.casinoName}
            </Text>
          </View>
          <View style={styles.ticketInfo}>
            <View style={{flex: 1}}>
              <Text style={styles.ticketNameText}>
                {ticket.matchName}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 8}}>
              <Text style={styles.ticketDateText}>
                {moment().isBefore(ticket.expire_time, 'second') ? `${moment().to(ticket.expire_time)}有效` : '已过期'}
              </Text>
            </View>
          </View>
          <View style={styles.ticketSerial}>
            <Text style={styles.ticketSerialText}>序列号:  </Text>
            <Text style={{fontWeight: 'bold',color: '#ff875c'}}>
              {`${ticket.seria_No.substring(0, 4)}  ${ticket.seria_No.substring(4, 8)}  ${ticket.seria_No.substring(8)}`}
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  _renderTicket_verify(ticket) {

    return (
      <TouchableOpacity style={styles.ticket}>
        <Image style={styles.ticketBgImg} source={require('../../imgs/account_ticket_bg_v.png')}>
          <View style={styles.ticketTitle}>
            <Text style={styles.ticketTitleText}>
              {ticket.casinoName}
            </Text>
          </View>
          <View style={styles.ticketInfo}>
            <View style={{flex: 1}}>
              <Text style={styles.ticketNameText}>
                {ticket.matchName}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 8, marginRight: 50}}>
              <Text style={styles.ticketDateText}>使用时间：{moment(ticket.create_time).format('YYYY-MM-DD hh:mm:ss')}</Text>
            </View>
          </View>
          <View style={styles.ticketSerial}>
            <Text style={styles.ticketSerialText}>序列号:  </Text>
            <Text style={{fontWeight: 'bold',color: '#ff875c'}}>
              {`${ticket.seria_No.substring(0, 4)}  ${ticket.seria_No.substring(4, 8)}  ${ticket.seria_No.substring(8)}`}
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  _renderTickets(data) {
    const tickets = data.tickets
    const listHeight = tickets.length * 150;
    const viewHeight = Common.window.height - 124

    return (
      <ListView dataSource={this.state.dataSource_unused.cloneWithRows(tickets)}
        renderRow={this._renderTicket.bind(this)}
        style={styles.tickets}
        initialListSize={1000}
        renderScrollComponent={
          (props) =>
            <PullRefreshLoadmoreScrollView
              onRefresh={()=>this._onRefresh(false)}
              onLoadmore={()=>this._onLoadmore(false)}
              listHeight={listHeight}
              viewHeight={viewHeight}
              status={data.status}/>}
        enableEmptySections={true}/>
    )
  }

  _renderTickets_verify(data) {
    const tickets = data.tickets
    const listHeight = tickets.length * 150;
    const viewHeight = Common.window.height - 124

    return (
      <ListView dataSource={this.state.dataSource_used.cloneWithRows(tickets)}
        renderRow={this._renderTicket_verify.bind(this)}
        initialListSize={1000}
        style={styles.tickets}
        renderScrollComponent={
          (props) =>
            <PullRefreshLoadmoreScrollView
              onRefresh={()=>this._onRefresh(true)}
              onLoadmore={()=>this._onLoadmore(true)}
              listHeight={listHeight}
              viewHeight={viewHeight}
              status={data.status}/>}
        enableEmptySections={true}/>
    )
  }

  _onRefresh(verify) {
    let args = {
      start: true,
      used: verify ? 1 : 0,
      offset: 0,
      limit: 10
    }
    this.props.actions.fetchAccountTicket(args);
  }

  _onLoadmore(verify) {
    used = verify ? 'used' : 'unused'
    let args = {
      start: false,
      used: verify ? 1 : 0,
      offset: this.props.tickets[used].tickets.length,
      limit: 10
    }
    this.props.actions.fetchAccountTicket(args);
  }

  _renderScrollTabView() {
    const {tickets} = this.props

    return (
      <ScrollableTabView
        style={{marginTop: 10}}
        renderTabBar={() => <TabBarInner tabNames={['未验证', '已验证']}/>}>
        <View tabLabel='false' style={{flex: 1}}>
          {this._renderTickets(tickets.unused)}
        </View>
        <View tabLabel='true' style={{flex: 1}}>
          {this._renderTickets_verify(tickets.used)}
        </View>
      </ScrollableTabView>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <NavBar name='门票验证' navigator={this.props.navigator}/>
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
  tickets: {
    marginTop: 15
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
    paddingBottom: 20
  },
  ticketDetail: {
    marginLeft: ticketBgImgWidth * 0.35,
    width: ticketBgImgWidth * 0.4,
    height: ticketBgImgHeight * 0.6,
    justifyContent: 'space-around'
  },
  ticketTitle: {
    flex: 1,
    marginLeft: 50,
    marginTop: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  ticketInfo: {
    flex: 1,
    alignItems: 'center'
  },
  ticketSerial: {
    flex: 1,
    marginLeft: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  ticketTitleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#636363'
  },
  ticketNameText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#636363',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  ticketDateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#787878',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  ticketSerialText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#787878',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

const mapStateToProps = (state) => ({tickets: state.Account.tickets});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTicket)
