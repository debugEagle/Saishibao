import StatusBarIOS from '../components/StatusBarIOS';

import TabBarView from './TabBarView';

import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  StatusBar,
  NativeModules
} from 'react-native';

const WeChatAPI = NativeModules.WeChatAPI


class App extends Component {

  constructor(props) {
    super(props)
    WeChatAPI.registerWx((b) => console.log(b))
  }

  render() {
    return(

    <View style={{flex: 1}}>
      <StatusBarIOS barStyle="light-content"/>

      <Navigator
        initialRoute={{name: 'TabBarView', component: TabBarView}}
        configureScene={()=>{
          return  Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return (
            <Component navigator = {navigator} route = {route} {...route.passProps} />
          )
        }}
      />
      </View>

    );
  }
}

export default App;
