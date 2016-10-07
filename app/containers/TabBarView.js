import codePush from "react-native-code-push";

import icons from '../assets/icons';
import Common from '../common/constants';

import HotListContainer from './HotListContainer';
import DailyListContainer from './DailyListContainer';
import ScheduleListContainer from './ScheduleListContainer'
import AccountInfo from '../pages/AccountInfo'
import Account from '../pages/Account'
import AccountGift from '../pages/AccountGift'

import React, { Component } from 'react';
import {
  TabBarIOS,
  Text,
  View
} from 'react-native';


const tabBarTintColor = '#ffffff';// 标签栏的背景颜色
const tabTintColor = Common.colors.themeColor; // 被选中图标颜色


class MainView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'myAccount',
    }

  }

  componentDidMount(){
    // codePush.sync();
    // codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  }

  _createTabbarItem(title,icon,icon2,selectedTab){
    return (
      <TabBarIOS.Item
        title={title}
        icon={icon}
        selected={this.state.selectedTab === selectedTab}

        onPress={() => {
          this.setState({
            selectedTab:selectedTab,
          });
        }}
        selectedIcon={icon2}
        >

        {this._renderComponent(selectedTab)}
      </TabBarIOS.Item>
    );
  }

  //根据selectedTab导航到相应的NavTab
  _renderComponent(selectedTab){

    if (selectedTab === 'hot') {

      return <HotListContainer navigator = {this.props.navigator} {...this.props}/>
    }
    else if (selectedTab === 'casino') {

      return <DailyListContainer navigator = {this.props.navigator} {...this.props}/>
    }
    else if (selectedTab === 'schedule') {

      return <ScheduleListContainer navigator = {this.props.navigator} {...this.props}/>
    }
    else if (selectedTab === 'myAccount') {

      return <Account navigator = {this.props.navigator} {...this.props}/>
    }
  }

  render() {

    return (
      <TabBarIOS barTintColor={tabBarTintColor} tintColor={tabTintColor}>
        {this._createTabbarItem('热门',{uri: icons.hot, scale: 6},{uri: icons.hot2, scale:6}, 'hot')}
        {this._createTabbarItem('俱乐部',{uri: icons.casino, scale: 6},{uri: icons.casino2, scale: 6}, 'casino')}
        {this._createTabbarItem('赛事日历',{uri: icons.schedule, scale: 6},{uri: icons.schedule2, scale: 6},'schedule')}
        {this._createTabbarItem('我的账户',{uri: icons.myAccount, scale: 6},{uri: icons.myAccount2, scale: 6},'myAccount')}
      </TabBarIOS>
    );
  }
}

export default MainView;
