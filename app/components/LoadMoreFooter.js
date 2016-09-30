import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native';

class LoadMoreFooter extends Component {
  render() {
    const type = this.props.type;
    if (type === 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>向上拉取更多数据</Text>
        </View>
      )
    } else if (type === 1) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text style={styles.footerTitle}>正在加载更多……</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>全部数据加载完成</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    }
})

export default LoadMoreFooter;
