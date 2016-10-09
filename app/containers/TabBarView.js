import HotListContainer from './HotListContainer';
import DailyListContainer from './DailyListContainer';
import HotDayInfo from '../pages/HotDayInfo';
import MapPage from '../pages/MapPage'
import MatchSettingContainer from './MatchSettingContainer';
import SwiperSample from '../../test'
import codePush from "react-native-code-push";
import RegGetSmsCodeContainer from './RegGetSmsCodeContainer';
import RegInputSmsCodeContainer from './RegInputSmsCodeContainer';
import Common from '../common/constants';
import ScheduleListContainer from './ScheduleListContainer';
import CasinoIntro from '../pages/CasinoIntro';
import DailyInfoContainer from  './DailyInfoContainer';
import DailyResult from '../pages/DailyResult';
import RegPwdContainer from './RegPwdContainer';
import UserLoginContainer from './UserLoginContainer';
import WxTest from '../pages/WxTest';
import RegSuccess from '../pages/RegSuccess';
import AccountContainer from './AccountContainer';

import AccountInfo from '../pages/AccountInfo'
import Account from '../pages/Account'
import AccountGift from '../pages/AccountGift'
import ScheduleDetail from '../pages/ScheduleDetail'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from '../components/TabBar'

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
          initialPage={3}
          renderTabBar={() => <TabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
          tabBarPosition='bottom'>
        <HotListContainer tabLable='hot' navigator = {this.props.navigator} {...this.props}/>
        <DailyListContainer tabLable='casino' navigator = {this.props.navigator} {...this.props}/>
        <ScheduleListContainer tabLable='schedule' navigator = {this.props.navigator} {...this.props} />
        <AccountContainer tabLable='myAccount' navigator = {this.props.navigator} {...this.props}/>
      </ScrollableTabView>
    )
  }
}

export default MainView;
