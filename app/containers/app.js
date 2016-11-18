import * as WeChat from 'react-native-wechat'

import StatusBarIOS from '../components/StatusBarIOS';
import TabBarView from './TabBarView';
import AppIntroPage from '../pages/Other/AppIntroPage'
import codePush from "react-native-code-push";
import Common from  '../common/constants.js';
import storage from 'react-native-sync-storage';

import HTTPUtil from '../common/utils/HTTPUtil'



import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  StatusBar,
  NativeModules,
  AsyncStorage,
  InteractionManager,
  Alert,
  Linking,
  Platform
} from 'react-native';

let firstView = null;

let haveUsed;



class App extends Component {

  constructor(props) {
    super(props)
    WeChat.registerApp('wx148eb8f66f47fb36')

    this.state = {
      haveUsed: 0, //0 初始化 , 1 未读取到， 2 读取到值
      init: true,
    }


  }

  componentWillMount() {

    InteractionManager.runAfterInteractions(() => {
      storage.init.then((json) => {
        if (! storage.get('haveUsed')) {
          this.setState({
            haveUsed: 1,
          })
        } else {
          this.setState({
            haveUsed: 2,
          })
        }


      });
    });

    // codePush.checkForUpdate()
    // .then((update) => {
    //     if (!update) {
    //         console.log("The app is up to date!");
    //     } else {
    //         console.log("An update is available! Should we download it?");
    //     }
    // });



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
      // installMode: codePush.InstallMode.ON_NEXT_RESTART
      installMode: codePush.InstallMode.IMMEDIATE
    });

    const url = 'https://api.91buyin.com/version';
    const currentVersion = '1.1.3'
    HTTPUtil.get(url).then((json) => {
      try {
        console.log(json.value.version);
        if (currentVersion < json.value.version) {
          const APP_STORE_LINK = 'itms://itunes.apple.com/cn/app/sai-shi-bao-pai-shou-yi-dong/id1153049809?mt=8';

          Alert.alert(
              '赛事宝有新版本啦',
              '您可以前往app store下载。',
              [
                {text: '立即更新', onPress: () => {
                    if(Platform.OS =='ios'){
                        Linking.openURL(APP_STORE_LINK).catch(err => console.log('An error occurred', err));
                    }
                    else{
                        Linking.openURL(PLAY_STORE_LINK).catch(err => console.log('An error occurred', err));
                    }
                }},
              ]
          );
        }

      } catch (e) {
        console.log(e.name)
      }
    });
  }

  _finishIntro(haveFinished) {
    if (haveFinished) {

      console.log('haveUsed');
      storage.set('haveUsed' , true);
      this.setState({
        haveUsed: 2,
      })
    }
  }



  render() {

    return(

      <View style={{flex: 1}}>
      {this.state.haveUsed == 0 &&
        null
      }
      {this.state.haveUsed == 1 &&
        <AppIntroPage finishIntro={(haveFinished) => this._finishIntro(haveFinished)}/>
      }
      {this.state.haveUsed == 2 &&
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
