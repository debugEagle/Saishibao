
import Constants from '../common/constants';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';


class StatusBarIOS extends Component {
  render() {
    return (
      <View>
        <StatusBar {...this.props}/>
        <View style={styles.statusBar} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    flex: 1,
    height: 20,
    backgroundColor: Constants.colors.themeColor,
  }
})

export default StatusBarIOS;
