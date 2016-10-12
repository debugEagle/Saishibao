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
        <Image style={styles.ticketBgImg} source={require('../../imgs/account_ticket_bg.png')}>
          <View style={styles.ticketTitle}>
            <Text style={styles.ticketTitleText} >京扑克俱乐部</Text>
          </View>
          <View style={styles.ticketInfo}>
            <Text style={styles.ticketInfoText}>晚场暖身赛</Text>
            <Text style={styles.ticketInfoText}>2016.6.25</Text>

          </View>
          <View style={styles.ticketSerial}>
            <Text style={styles.ticketSerialText}>序列号: </Text>
            <Text style={{fontWeight:'bold', color: '#ff875c'}}>1234567890</Text>
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
            <Text style={styles.ticketTitleText} >京扑克俱乐部</Text>
          </View>
          <View style={styles.ticketInfo}>
            <Text style={styles.ticketInfoText}>晚场暖身赛</Text>
            <Text style={styles.ticketInfoText}>2016.6.25</Text>

          </View>
          <View style={styles.ticketSerial}>
            <Text style={styles.ticketSerialText}>序列号: </Text>
            <Text style={{fontWeight:'bold', color: '#ff875c'}}>1234567890</Text>
          </View>

        </Image>
      </TouchableOpacity>
    )
  }

  _renderTickets_verify(tickets) {

    return (
      <ListView

        dataSource={this.state.dataSource.cloneWithRows(tickets)}
        renderRow={this._renderTicket_verify.bind(this)}
        initialListSize={15}
        style={styles.tickets}
        enableEmptySections={true}/>
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
          {this._renderTickets_verify(mockData)}
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
    paddingBottom: 20,
    // flexDirection: 'row',
    // alignItems: 'center'
  },
  ticketDetail: {
    marginLeft: ticketBgImgWidth * 0.35,
    width: ticketBgImgWidth * 0.4,
    height: ticketBgImgHeight * 0.6,
    // alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
  },
  ticketTitle: {
    flex: 1,
    marginLeft: 50,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    // borderWidth: 1,
  },
  ticketInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  ticketSerial: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  ticketTitleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#636363'
  },
  ticketInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#787878',

  },
  ticketSerialText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#787878',
    backgroundColor: 'rgba(0,0,0,0)',

  }
});

const mapStateToProps = (state) => ({
    Account: state.HotList,
    UserLogin: state.UserLogin
  });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTicket)
