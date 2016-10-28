import HotList from '../pages/Hot/HotList';
import DailyList from '../pages/Daily/DailyList';
import ScheduleList from '../pages/Schedule/ScheduleList';
import Account from '../pages/Account/Account'
import AccountPay from '../pages/Account/AccountPay'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'

import codePush from "react-native-code-push";

import React, {Component} from 'react';
import {TabBarIOS, Text, View} from 'react-native';
import WxTest from '../pages/Other/WxTest';

class MainView extends Component {

  constructor(props) {
    super(props);
    this.children = []
    this.state = {
      tabNames: [
        '热门', '俱乐部', '赛事日历', '我的',
      ],
      tabIconNames: ['hot', 'casino', 'schedule', 'myAccount', ],
      tabPage: {
        currentPage: 0,
        lastPage: 0,
      },
    }
  }

  handleChangeTab({i, ref, from, }) {
    this.setState({
      tabPage: {
        currentPage: i,
        lastPage: from
      }
    })
  }

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;

    return (
      <ScrollableTabView
        scrollWithoutAnimation={true}
        initialPage={this.props.page || 0}
        renderTabBar={() => <TabBar tabNames={tabNames}
          tabIconNames={tabIconNames}/>}
        tabBarPosition='bottom'
        onChangeTab={this.handleChangeTab.bind(this)}
      >
        <HotList tabLable='hot' navigator={this.props.navigator} {...this.props}/>
        <DailyList tabLable='casino' navigator={this.props.navigator} {...this.props}/>
        <ScheduleList tabLable='schedule' navigator={this.props.navigator} {...this.props}/>
        <Account tabLable='myAccount'  navigator={this.props.navigator} {...this.props}/>
      </ScrollableTabView>
    )
  }
}

export default MainView;
