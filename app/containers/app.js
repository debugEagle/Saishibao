import StatusBarIOS from '../components/StatusBarIOS';

import TabBarView from './TabBarView';
import AppIntroPage from '../pages/Other/AppIntroPage'
import codePush from "react-native-code-push";
import Common from  '../common/constants.js';
import * as WeChat from 'react-native-wechat'


import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  StatusBar,
  NativeModules,
  AsyncStorage,
} from 'react-native';

let firstView = null;
class App extends Component {

  constructor(props) {
    super(props)
    WeChat.registerApp('wx148eb8f66f47fb36')

    this.state = {
      haveFinished: false,
      init: true,
    }


  }

  componentWillMount() {
    // codePush.sync();
    // codePush.sync({updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE});
    codePush.sync({
      deploymentKey: 'ji4nZzCNISdZjGlhFiLFcnU7lboAEJF3Rl6iW',
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: '赛事宝有新版本了，是否更新？',
        title: '更新提示'
      },
      installMode: codePush.InstallMode.ON_NEXT_RESTART
    });

    // AsyncStorage.getItem(Common.haveUsed).then((value)=>{
    //   this.setState({
    //     haveFinished: value ,
    //     init: false,
    //   })
    // });
  }

  _finishIntro(haveFinished) {
    if (haveFinished) {
      this.setState({
        haveFinished: haveFinished,
      })
    }
    // AsyncStorage.setItem(Common.haveUsed, true);

  }



  render() {

    return(

      <View style={{flex: 1}}>
      {!this.state.haveFinished ?
        <AppIntroPage finishIntro={(haveFinished) => this._finishIntro(haveFinished)}/>
        :
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
      }
      </View>





    );
  }
}

export default App;
