import icons from '../assets/icons';
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

      selectedTab: Common.defaultTab,

    }

  }

  componentDidMount(){
    codePush.sync();
    // codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  }



  _createTabbarItem(title,icon,icon2,selectedTab){
    return (
      <TabBarIOS.Item
        title={title}
        icon={icon}
        selected={this.state.selectedTab === selectedTab}
        //selected='myAccount'


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
      // return <MapPage/>
    }
    else if (selectedTab === 'schedule') {

      return <ScheduleListContainer navigator = {this.props.navigator} {...this.props} />
      // return <RegInputSmsCodeContainer navigator = {this.props.navigator} {...this.props} />
      // return <SwiperSample/>
    }
    else if (selectedTab === 'myAccount') {
      // return <RegPwdContainer navigator = {this.props.navigator} {...this.props} />
      // return <RegGetSmsCodeContainer navigator = {this.props.navigator} {...this.props} />
      // return <RegInputSmsCodeContainer navigator = {this.props.navigator} {...this.props} />
      // return <WxTest/>
      // return <DailyResult  navigator = {this.props.navigator} />
      //  return <CasinoIntro  navigator = {this.props.navigator} />
      // return <RegSuccess navigator = {this.props.navigator} />
      return <AccountContainer navigator = {this.props.navigator} {...this.props}/>
      // return <Account />
    }

  }

  render() {

    return (

      <TabBarIOS barTintColor={tabBarTintColor} tintColor={tabTintColor} >
        {this._createTabbarItem('热门',{uri: icons.hot, scale: 6},{uri: icons.hot2, scale:6}, 'hot')}
        {this._createTabbarItem('俱乐部',{uri: icons.casino, scale: 6},{uri: icons.casino2, scale: 6}, 'casino')}
        {this._createTabbarItem('赛事日历',{uri: icons.schedule, scale: 6},{uri: icons.schedule2, scale: 6},'schedule')}
        {this._createTabbarItem('我的账户',{uri: icons.myAccount, scale: 6},{uri: icons.myAccount2, scale: 6},'myAccount')}
      </TabBarIOS>




    );
  }
}




export default MainView;
