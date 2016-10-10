import HotList from '../pages/Hot/HotList';
import DailyList from '../pages/Daily/DailyList';
import ScheduleList from '../pages/Schedule/ScheduleList';
import Account from '../pages/Account/Account'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'

import codePush from "react-native-code-push";

import React, { Component } from 'react';
import {
  TabBarIOS,
  Text,
  View
} from 'react-native';

class MainView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['热门', '俱乐部', '赛事日历', '我的'],
      tabIconNames: ['hot', 'casino', 'schedule', 'myAccount']
    }
  }

  componentDidMount(){
    codePush.sync();
    // codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  }

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;

    return (
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <TabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
        tabBarPosition='bottom'>
        <HotList tabLable='hot' navigator = {this.props.navigator} {...this.props}/>
        <DailyList tabLable='casino' navigator = {this.props.navigator} {...this.props}/>
        <ScheduleList tabLable='schedule' navigator = {this.props.navigator} {...this.props} />
        <Account tabLable='myAccount' navigator = {this.props.navigator} {...this.props}/>
      </ScrollableTabView>
    )
  }
}

export default MainView;
