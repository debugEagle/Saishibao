import Util from '../common/utils';
import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, {Component} from 'react';

import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Navigator,
  SegmentedControlIOS,
  ScrollView,
  Animated,
  Easing
} from 'react-native';

class ScheduleList extends Component {
  constructor(props) {
    super(props);
  }

  _renderSelectView() {

    return (
      <View style={[styles.selectView,styles.withBorderBottom]}>
        <TouchableOpacity
          style={[styles.selectViewItem,styles.withBorderRight]}
          onPress={() => this._handleAreaViewAnimation()}
          >
          <View style={styles.selectViewItemView}>
            <Text style={styles.selectViewItemText}>选择地区</Text>
            <Icon style={styles.selectViewItemIcon} color="#e0eaff" size={16} name='chevron-down'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectViewItem,styles.withBorderRight]}
          >
          <View style={styles.selectViewItemView}>
            <Text style={styles.selectViewItemText}>选择赛事</Text>
            <Icon style={styles.selectViewItemIcon} color="#e0eaff" size={16} name='chevron-down'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectViewItem}
          >
          <View style={styles.selectViewItemView}>
            <Text style={styles.selectViewItemText}>选择时间</Text>
            <Icon style={styles.selectViewItemIcon} color="#e0eaff" size={16} name='chevron-down'/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _rendereSelectContentView() {

  }

  _handleAreaViewAnimation() {
    console.log('test');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title='赛事日历'/>
        {this._renderSelectView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor
  },
  selectView: {
    height: 40,
    paddingVertical: 8,
    flexDirection: 'row'
  },
  selectViewItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectViewItemView: {
    flexDirection: 'row'
  },
  selectViewItemIcon: {
    marginLeft: 10,
  },
  withBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#e0eaff'
  },
  withBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
});

export default ScheduleList
