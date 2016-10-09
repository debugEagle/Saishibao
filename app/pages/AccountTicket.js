import NavBar from '../components/NavBar';
import TabBarInner from '../components/TabBarInner'

import Common from '../common/constants';
import * as ActionCreator from '../actions'
import PullRefreshScrollView from '../common/pullRefresh';

import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

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

class AccountTicket extends Component {

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
        <Image style={styles.ticketBgImg} source={require('../imgs/account_ticket_bg.png')}>
          <Image style={styles.ticketCasinoImg} source={require('../imgs/casino_default.png')}/>
          <View style={styles.ticketDetail}>
            <Text style={{fontSize: 16, fontWeight: '900', color: '#636363'}}>京扑克俱乐部</Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#787878'}}>晚场暖身赛</Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#787878'}}>2016.6.25</Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  _renderTickets(tickets) {

    return (
      <ListView

        dataSource={this.state.dataSource.cloneWithRows(tickets)}
        renderRow={this._renderTicket.bind(this)}
        initialListSize={15}
        style={styles.tickets}
        enableEmptySections={true}/>
    )
  }

  _renderScrollTabView() {

    return (
      <ScrollableTabView style={{
        marginTop: 10,
      }} renderTabBar={() => <TabBarInner tabNames={['未验证', '已验证']}/>}>
        <View tabLabel='false' style={{flex: 1}}>
          {this._renderTickets(mockData)}
        </View>
        <View tabLabel='true' style={{flex: 1}}>
          {this._renderTickets(mockData)}
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  ticketCasinoImg: {
    height: ticketBgImgHeight * 0.7,
    width: ticketBgImgHeight * 0.7,
    marginLeft: ticketBgImgWidth * 0.047
  },
  ticketDetail: {
    width: ticketBgImgHeight,
    height: ticketBgImgHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ticketInfo: {

  }
});

const mapStateToProps = (state) => ({Account: state.HotList, UserLogin: state.UserLogin});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTicket)
