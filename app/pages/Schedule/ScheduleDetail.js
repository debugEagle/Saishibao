import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

class AccountInfo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    };

    this._renderRow = this._renderRow.bind(this);
  }

  componentWillMount() {
    const { actions, matchInfo } = this.props;
    actions.fetchScheduleDetail(matchInfo.bigMatchSerieId)
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetScheduleDetail()
  }

  _renderListTitle() {
    return (
      <View style={styles.title}>
        <View style={[styles.center, {flex: 1.5, marginBottom: -15}]}>
          <Text style={styles.titleText}>日期</Text>
        </View>
        <View style={[styles.center, {flex: 5, marginBottom: -15}]}>
          <Text style={styles.titleText}>比赛</Text>
        </View>
        <View style={[styles.center, {flex: 1.5, marginBottom: -15}]}>
          <Text style={styles.titleText}>买入</Text>
        </View>
      </View>
    )
  }

  _renderListView(matches) {

    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(matches)}
        renderRow={this._renderRow}
        enableEmptySections = {true}/>
    )
  }

  _renderRow(item) {
    let c_code = 'cny'
    let hkd = false
    if (item.exchangeRate) {
      c_code = item.exchangeRate.currency_code.toLowerCase()
    }
    if (c_code==='hkd') {
      hkd = true
      c_code = 'usd'
    }

    let real_buyin = item.real_buyin
    if (item.rake_buyin !== 0) {
      real_buyin = real_buyin + '+' + item.rake_buyin
    }

    return (
      <View style={styles.matchItem}>
        <View style={[{flex: 1.1}, styles.center]}>
          <Text style={styles.itemText}>{item.match_day.substring(5)}</Text>
        </View>
        <View style={[{flex: 5}, styles.matchText]}>
          <Text numberOfLines={2} style={styles.itemText}>{item.name}</Text>
        </View>
        <View style={[{flex: 1.2},{justifyContent:'center', paddingHorizontal: 2,alignItems: 'center', marginLeft:10}]}>
          <Text numberOfLines={2} style={styles.itemText}>
            {hkd ? 'HK' : null}
            <Icon color="#101010" size={13} name={c_code}/>
            {real_buyin}
          </Text>
        </View>
      </View>
    )
  }

  _renderInfo(detailInfo) {
    return (
      <View style={styles.matchInfo}>
        <View style={styles.matchInfoItem}>
          <View style={styles.matchInfoItemLable}>
            <Text numberOfLines={1} style={styles.infoText}>赛事名称：</Text>
          </View>
          <View style={styles.matchInfoItemValue}>
            <Text numberOfLines={1} style={styles.infoText}>{detailInfo.bigMatchSerieName}</Text>
          </View>
        </View>
        <View style={styles.matchInfoItem}>
          <View style={styles.matchInfoItemLable}>
            <Text numberOfLines={1} style={styles.infoText}>比赛场馆：</Text>
          </View>
          <View style={styles.matchInfoItemValue}>
            <Text numberOfLines={1} style={styles.infoText}>{detailInfo.casino}</Text>
          </View>
        </View>
        <View style={styles.matchInfoItem}>
          <View style={styles.matchInfoItemLable}>
            <Text numberOfLines={1} style={styles.infoText}>比赛地点：</Text>
          </View>
          <View style={styles.matchInfoItemValue}>
            <Text numberOfLines={1} style={styles.infoText}>{detailInfo.address}</Text>
          </View>
        </View>
        <View style={styles.matchInfoItem}>
          <View style={styles.matchInfoItemLable}>
            <Text numberOfLines={1} style={styles.infoText}>电话：</Text>
          </View>
          <View style={styles.matchInfoItemValue}>
            <Text numberOfLines={1} style={styles.infoText}>{detailInfo.tel}</Text>
          </View>
        </View>
        <View style={styles.matchInfoItem}>
          <View style={styles.matchInfoItemLable}>
            <Text numberOfLines={1} style={styles.infoText}>网址：</Text>
          </View>
          <View style={styles.matchInfoItemValue}>
            <Text numberOfLines={1} style={[styles.infoText,{fontSize: 11}]}>{detailInfo.website}</Text>
          </View>
        </View>
        <View style={styles.matchInfoItem}>
          <View style={styles.matchInfoItemLable}>
            <Text numberOfLines={1} style={styles.infoText}>备注：</Text>
          </View>
          <View style={styles.matchInfoItemValue}>
            <Text numberOfLines={1} style={styles.infoText}> </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <NavBar name='赛事详情' navigator={this.props.navigator}/>
        <View style={styles.detail}>
          {this._renderListTitle()}
          {this._renderListView(this.props.ScheduleDetail.matches)}
        </View>
        <View style={styles.info}>
          {this._renderInfo(this.props.matchInfo)}
        </View>
      </View>
    );
  }
}

const itemHeight = Common.window.height / 12;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  detail: {
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
  title: {
    height: itemHeight,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e0eaff'
  },
  flex_1: {
    flex: 1,
  },
  flex_5: {
    flex: 5,
  },
  flex_1_2: {
    flex: 1.2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#424242'
  },
  matchItem: {
    height: itemHeight,
    marginHorizontal: 7,
    flexDirection: 'row',
    borderTopColor: '#e0eaff',
    borderTopWidth: 0.5,
    borderBottomColor: '#e0eaff',
    borderBottomWidth: 0.5
  },
  matchText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: '#e0eaff',
    borderRightColor: '#e0eaff'
  },
  itemText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#101010'
  },
  info: {
    flex: 1
  },
  infoText: {
    fontSize: 13,
    color: '#424242'
  },
  matchInfo: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    paddingTop: 10,
    borderWidth: 2,
    borderColor: '#ccdbff',
  },
  matchInfoItem: {
    flex: 1,
    flexDirection: 'row'
  },
  matchInfoItemLable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 3,
  },
  matchInfoItemValue: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});

const mapStateToProps = (state) => ({
  ScheduleDetail: state.Schedule.ScheduleDetail
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
