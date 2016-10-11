import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/Loading';


import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  InteractionManager,
  AlertIOS,
  PixelRatio,
} from 'react-native';


class DailyResult extends Component {
  constructor(props) {
    super(props);
  }

  _renderTitleRow(item1, item2, item3 ) {
    return (
      <View style={styles.settingTitle}>
        <View style={[styles.settingTitleBlock, {flex: 1}]}>
          <Text style={styles.settingTitleText}>{item1}</Text>
        </View>
        <View style={[styles.settingTitleBlock, {flex: 2}]}>
          <Text style={styles.settingTitleText}>{item2}</Text>
        </View>
        <View style={[styles.settingTitleBlock, {flex: 2}]}>
          <Text style={styles.settingTitleText}>{item3}</Text>
        </View>


      </View>
    );
  }



  _renderItem(item) {
    return (
    <View style={styles.settingItemBlock}>
      <Text style={styles.settingText}>{item}</Text>
    </View>
    );
  }

  _renderItemRow( rank, name, bonus ) {
    return (
      <View style={styles.ItemRow}>
        <View style={[styles.settingItemBlock, {flex: 1}]}>
          <Text style={styles.settingText}>{rank}</Text>
        </View>
        <View style={[styles.settingItemBlock, {flex: 2}]}>
          <Text style={styles.settingText}>{name}</Text>
        </View>
        <View style={[styles.settingItemBlock, {flex: 2}]}>
          <Text style={styles.settingText}>{bonus}</Text>
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar name='赛事结果' navigator={this.props.navigator}/>
        <View style={styles.itemView}>
          <View style={styles.matchName}>
            <Text style={styles.matchNameText}>
              MTT常规赛
            </Text>
          </View>
          {this._renderTitleRow('名次', '姓名', '奖金')}
          {this._renderItemRow('1', '张三', '100000')}
          {this._renderItemRow('2', '李四', '20000')}


        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  matchName: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#e0eaff',
  },
  matchNameText: {
    fontSize: 16 ,
    fontWeight: 'bold',

  },
  settingItemBlock: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#e0eaff',
    paddingTop :10,
    paddingBottom :10,

  },
  settingTitle: {
    flexDirection: 'row',
    paddingTop :10,
    paddingBottom :10,
    borderBottomWidth: 2,
    borderColor: '#e0eaff',
  },
  itemView: {
    borderBottomWidth: 2,
    borderColor: '#e0eaff',
  },
  ItemRow: {
    flexDirection: 'row',
    // paddingTop :10,
    // paddingBottom :10,
    // borderBottomWidth: 2,
    // borderColor: '#e0eaff',
  },
  settingTitleBlock: {
    // flex:1,
    marginTop: 2,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  settingText: {
    color: '#424242',
    fontSize: 14,

  },
  settingTitleText: {
    color: '#424242',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingItemBlock_Last: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0eaff',

  },


});

export default DailyResult;
