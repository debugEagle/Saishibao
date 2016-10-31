import Text from '../../components/Text';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
import AppIntro from 'react-native-app-intro';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 75 * 2,
    height: 63 * 2,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: 40
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
  },
});

class AppIntroPage extends Component {

  onSkipBtnHandle = (index) => {
    // Alert.alert('Skip');
    this.props.finishIntro(true);
  }
  doneBtnHandle = () => {
    // Alert.alert('Done');
    this.props.finishIntro(true);
  }
  // nextBtnHandle = (index) => {
  //   Alert.alert('Next');
  //   console.log(index);
  // }
  // onSlideChangeHandle = (index, total) => {
  //   console.log(index, total);
  // }

  render() {
    return (
      <AppIntro
        //onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        //onSlideChange={this.onSlideChangeHandle}
      >
      <View style={[styles.slide]}>
        <View style={[styles.header, {width: windowsWidth}]}>
          <View>
            <Image style={{width: windowsWidth, height: windowsHeight }} source={require('../../imgs/intro_1.png')} />
          </View>
        </View>
      </View>
      <View style={[styles.slide]}>
        <View style={[styles.header, {width: windowsWidth}]}>
          <View>
            <Image style={{width: windowsWidth, height: windowsHeight }} source={require('../../imgs/intro_2.png')} />
          </View>
        </View>
      </View>
      <View style={[styles.slide]}>
        <View style={[styles.header, {width: windowsWidth}]}>
          <View>
            <Image style={{width: windowsWidth, height: windowsHeight }} source={require('../../imgs/intro_3.png')} />
          </View>
        </View>
      </View>

      </AppIntro>
    );
  }
}

export default AppIntroPage;
