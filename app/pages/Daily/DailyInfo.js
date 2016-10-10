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

class DailyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

    };
    this._renderDailyInfoList = this._renderDailyInfoList.bind(this);
  }

  componentDidMount() {
    const { casino, showDate } = this.props;

    this.props.actions.fetchDailyInfo(casino.casino_id, showDate);
  }

  componentWillUnmount() {

    this.props.actions.resetDailyInfoList();
  }


  _onPressDetailStruct(bigMatch, isStruct) {
    console.log('isStruct '+ isStruct);
    this.props.navigator.push({
      title: 'MatchSetting',
      component: MatchSetting,
      passProps: {
        bigMatch,
        isStruct: isStruct
      },
    });
  }



  _renderDailyInfoList(item) {
    return (

      <View style={styles.detailItem}>
        <View>
          <Text style={styles.detailRemarkText}>{item.remark}</Text>
        </View>
          <View style={styles.detailTitle}>
            <Text style={styles.detailTitleText}>{item.dailyMatchSerie.name}</Text>
          </View>

            <View style={styles.detailRow}>
              <View style={styles.detailBlock}>
                  <Text style={styles.detailText}>类型: {item.style}</Text>
              </View>


              <View style={styles.detailBlock}>
                <Text style={styles.detailText}>参赛条件: {item.unit_price} 积分</Text>
              </View>
            </View>

          <View style={styles.detailRow}>
            <View style={styles.detailBlock}>
              <Text style={styles.detailText}>开始时间: {item.start_time} </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailText}>关闭注册: {item.close_reg_time}</Text>
            </View>
          </View>

          <View style={styles.detailJoinAndOthers}>

            <TouchableOpacity style={styles.detailStruct} onPress={() => this._onPressDetailStruct(item, true)}>
              <Text style={styles.detailStructText}>比赛结构表</Text>
            </TouchableOpacity>

            <View style={styles.detailJoin}>
              <Text style={styles.detailJoinText}>参加赛事</Text>
            </View>
            <TouchableOpacity style={styles.detailResult} onPress={() => this._onPressDetailStruct(item, false)}>

              <Text style={styles.detailResultText}>奖金结构表</Text>
            </TouchableOpacity>


          </View>


        </View>


    );
  }

  render() {
    const { DailyInfo } = this.props;
    let dailyInfoList = DailyInfo.dailyInfoList;
    return (
      <View style={styles.container}>
        <NavBar name={this.props.title} navigator={this.props.navigator}/>
        {DailyInfo.isLoading ?
        <Loading /> :
        <ListView style={{backgroundColor: '#e0eaff', height: Common.window.height - 67 - 44}}
          enableEmptySections = {true}
          dataSource={this.state.dataSource.cloneWithRows(dailyInfoList)}
          renderRow={this._renderDailyInfoList}
          initialListSize={1}
        />
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
    alignItems: 'center',
    // height: 40,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 60,
    marginRight: 60,
    // borderWidth: 1,

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
    fontSize: 14,
  },
  detailRow: {
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailBlock: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',

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
  DailyInfo: state.Daily.DailyInfo,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyInfo);
