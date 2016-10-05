import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/constants';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let NavigationBar = [];




    // 左边图片按钮
    if (this.props.leftIcon != undefined) {
      NavigationBar.push(
        <TouchableOpacity
          key={'leftIcon'}
          activeOpacity={0.75}
          style={styles.leftIcon}
          onPress={this.props.leftIconAction}
        >
          <View style={styles.touchArea}>
            <Icon color="white" size={30} name={this.props.leftIcon}/>
          </View>

        </TouchableOpacity>
      )
    }
    // 标题
    if (this.props.title != undefined) {
      NavigationBar.push(
        <Text key='title' style={styles.title}>{this.props.title}</Text>
      )
    }

    return (

      <View style={styles.navigationBarContainer}>
        {NavigationBar}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  navigationBarContainer: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    backgroundColor: Common.colors.themeColor,
    zIndex: 99
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',

  },
  leftIcon: {
    marginLeft: 15,
  },
  touchArea: {
    width : 30,
    height: 30,
  }
});

export default Header;
