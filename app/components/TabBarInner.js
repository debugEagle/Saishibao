import Common from '../common/constants';

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  View
} from 'react-native';

class TabBarInner extends Component {

  _renderVerticalLine(i, numberOfTabs, containerWidth) {
    const lineWidth = 1
    const lineHeight = 30
    const verticalLineStyle = {
      position: 'absolute',
      width: lineWidth,
      height: lineHeight,
      bottom: (48-lineHeight) / 2,
      left : (containerWidth / numberOfTabs - lineWidth / 2) * i,
      backgroundColor: '#e0eaff'
    }
    if (!i%2) {
      return null
    } else {
      return <View key={i} style={verticalLineStyle} />
    }
  }

  _renderTabOption(tab, i) {
    const color = this.props.activeTab == i
      ? Common.colors.themeColor
      : '#aaaaaa'; // 判断i是否是当前选中的tab，设置不同的文字颜色
    return (
      <TouchableOpacity key={i} onPress={() => this.props.goToPage(i)} style={styles.tab}>
        <View style={styles.tabItem}>
          <Text style={{
            color: color,
            fontSize: 15,
            fontWeight: '900'
          }}>
            {this.props.tabNames[i]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const containerWidth = Common.window.width;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineWidth = containerWidth / numberOfTabs / 2
    const tabUnderlineStyle = {
      position: 'absolute',
      width: tabUnderlineWidth,
      height: 4,
      backgroundColor: Common.colors.themeColor,
      marginLeft: tabUnderlineWidth / 2,
      bottom: 0
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: [
        0, containerWidth / numberOfTabs
      ]
    });

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this._renderTabOption(tab, i))}
        {this.props.tabs.map((tab, i) => this._renderVerticalLine(i, numberOfTabs, containerWidth))}
        <Animated.View style={[tabUnderlineStyle, {left}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: 48
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default TabBarInner
