import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import Util from '../../common/utils';
import Common from '../../common/constants';
import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatchSetting from '../Other/MatchSetting';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Navigator,
  AlertIOS,
  RefreshControl,
  InteractionManager,
  ScrollView,
} from 'react-native';

class HotList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daysDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

      infoDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

      selctedDay : 0,

    };


    this._renderDayList = this._renderDayList.bind(this);
    this._renderDayDetailList = this._renderDayDetailList.bind(this);


  }

  componentWillMount() {

    const { hotMatch } = this.props;
    this.props.actions.fetchHotDays(hotMatch.bigMatchSerie_id);
  }

  componentWillUnmount() {

    this.props.actions.resetHotDayList();
  }

  _onPressDateItem(hotDay) {

    this.setState({selctedDay: hotDay.day});
    this.props.actions.selectHotDayDetail(hotDay.match_day);

  }


  _rederSelectedDate(hotDay) {
    return (

      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => this._onPressDateItem(hotDay)}
        style={styles.selectedDateItemTouch}>
      <View style={styles.dateItem}>
        <View  style={styles.dateItem}>
          <Text style={styles.selectedDateText}>{hotDay.month} 月</Text>
        </View>
        <View  style={styles.dateItem}>
          <Text style={styles.selectedDateText}>{hotDay.day}</Text>
        </View>
      </View>

      </TouchableHighlight>
    );
  }

  _onPressDetailStruct(bigMatch, isStruct) {
    this.props.navigator.push({
      title: 'MatchSetting',
      component: MatchSetting,
      passProps: {
        bigMatch,
        isStruct: isStruct,
      },
    });
  }

  _rederUnselectedDate(hotDay) {

    return (

      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => this._onPressDateItem(hotDay)}
        style={styles.dateItemTouch}>
      <View style={styles.dateItem}>
        <View  style={styles.dateItem}>
          <Text style={styles.dateText}>{hotDay.month} 月</Text>
        </View>
        <View  style={styles.dateItem}>
          <Text style={styles.dateText}>{hotDay.day}</Text>
        </View>
      </View>

      </TouchableHighlight>
    );
  }

  _renderDayList(hotDay) {
    if (this.state.selctedDay === 0) {
      this.state.selctedDay = hotDay.day;
    }

    if ((hotDay.day === this.state.selctedDay))
    {
      return this._rederSelectedDate(hotDay);
    }
    else
    {
      return this._rederUnselectedDate(hotDay);
    }
  }

  _renderDayDetailList(bigMatch) {
    return (

      <View style={styles.detailItem}>
        <View>
          <Text style={styles.detailRemarkText}>{bigMatch.remark}</Text>
        </View>
        <View style={styles.detailTitle}>
          <Text style={styles.detailTitleText}>{bigMatch.name}</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}>类型:{bigMatch.style}</Text>

          <View style={styles.detailPrice}>
            <Text style={styles.detailText}>买入:{bigMatch.real_buyin}+{bigMatch.rake_buyin}</Text>
            <Text style={styles.detailText}>   （￥ {bigMatch.unit_price})</Text>
          </View>
        </View>

        <View style={styles.detailTime}>
          <View style={styles.flex}>
            <Text style={styles.detailTimeText}>开始时间: {bigMatch.open_time}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.detailTimeText}>关闭注册: {bigMatch.close_reg_time}</Text>
          </View>
        </View>

        <View style={styles.detailJoinAndOthers}>

          <TouchableOpacity style={styles.detailStruct} onPress={() => this._onPressDetailStruct(bigMatch, true)}>
            <Text style={styles.detailStructText}>比赛结构表</Text>
          </TouchableOpacity>

          <View style={styles.detailJoin}>
            <Text style={styles.detailJoinText}>参加赛事  </Text>
          </View>

          <TouchableOpacity style={styles.detailResult} onPress={() => this._onPressDetailStruct(bigMatch, false)}>
            <Text style={styles.detailResultText}>奖金结构表</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { HotDayInfo } = this.props;
    let hotDayList = HotDayInfo.hotDayList;
    let selectedList = HotDayInfo.selectedList;
    const { hotIntro } = this.props;

    return (

      <View style={styles.container}>
        <NavBar name={hotIntro.intro_title} navigator={this.props.navigator}/>
        {HotDayInfo.isLoading ?
          <Loading /> :
          <View>
            <View>
              <ListView
                enableEmptySections = {true}
                dataSource={this.state.daysDataSource.cloneWithRows(hotDayList)}
                renderRow={this._renderDayList}
                initialListSize={1}
                horizontal={true}
              />
            </View>
            <ListView style={{backgroundColor: '#e0eaff', height: Common.window.height - 67 - 44}}
              enableEmptySections = {true}
              dataSource={this.state.daysDataSource.cloneWithRows(selectedList)}
              renderRow={this._renderDayDetailList}
              initialListSize={1}
            />
          </View>
        }
      </View>
    );
  }
}

const detailTitleColor = '#424242';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor,
    // backgroundColor: '#e0eaff',
  },
  dateContainer: {

    marginTop: 15,
    height: 67,
  },
  selectedDateItemTouch: {
    width: 77,
    height: 67,
    borderWidth: 1,
    borderColor: Common.colors.themeColor,
    backgroundColor: Common.colors.themeColor,
  },
  selectedDateText: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateItemTouch: {
    width: 77,
    height: 67,
    borderWidth: 1,
    borderColor: Common.colors.itemColor,
    backgroundColor: '#ffffff',
  },
  dateItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {

    color: Common.colors.itemColor,
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  detailTitle: {
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    height: 65,
    marginLeft: 60,
    marginRight: 60,

  },
  detailTitleText: {
    color: detailTitleColor,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 23,
  },
  detailStyleAndPrice: {
    marginTop: 5,
    marginLeft: 45,
    marginRight: 10,
    flexDirection: 'row',
  },
  detailText: {
    color: detailTitleColor,
    fontSize: 13,
  },
  detailStyle: {
    marginTop: 15,
    alignItems: 'center',
  },
  detailPrice: {
    flex: 3,

  },
  detailTime: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 10,
    flexDirection: 'row',
  },
  detailTimeText: {
    fontSize: 14,
    color: '#444444',
  },
  detailJoinAndOthers: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 35,
  },
  detailJoin: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
    borderColor: '#e0eaff',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  testItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 50,

    width: Common.window.width ,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  flex: {
    flex: 1,
  },
  detailResult: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detailStruct: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  detailResultText: {
    fontSize: 14,
    color: detailTitleColor,
    fontWeight: 'bold',

  },
  detailStructText: {
    fontSize: 14,
    color: detailTitleColor,
    fontWeight: 'bold',

  },

  detailJoinText: {
    fontSize: 17,
    color: '#f24b51',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailPrice: {
    marginTop: 15,
    flexDirection: 'row',
  },

  detailRemarkText: {
    color: '#ff5722',
    fontSize: 14,
  }
});

const mapStateToProps = (state) => ({
  HotDayInfo: state.Hot.HotDayInfo
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HotList);
