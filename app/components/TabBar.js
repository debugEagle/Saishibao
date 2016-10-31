import icons from '../assets/icons';
import Common from '../common/constants';
import Text from './Text';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

class TabBar extends Component {

  _renderTabOption(tab, i) {
    const iconName = this.props.activeTab == i ? this.props.tabIconNames[i] + '2' : this.props.tabIconNames[i]; // 判断i是否是当前选中的tab，设置不同的Icon颜色
    const color = this.props.activeTab == i ? Common.colors.themeColor : '#aaaaaa'; // 判断i是否是当前选中的tab，设置不同的文字颜色
    return (
      <TouchableOpacity key={i} onPress={()=>this.props.goToPage(i)} style={styles.tab}>
        <View style={styles.tabItem}>
          <Image style={styles.tabItemIcon} source={{uri: icons[iconName], scale: 6}}/>
          <Text style={{color: color, fontSize: 12}}>
            {this.props.tabNames[i]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this._renderTabOption(tab, i))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height:48,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  tabItemIcon: {
    width: 30,
    height: 30,
    resizeMode: Image.resizeMode.contain
  }
})

export default TabBar
