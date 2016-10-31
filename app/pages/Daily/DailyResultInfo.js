import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'


import Common from '../../common/constants';
import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatchSetting from '../Other/MatchSetting';
import MatchResult from '../Other/MatchResult';
import Text from '../../components/Text';





import React, { Component } from 'react';
import {
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


const mockData = [
  {
    dailyMatch_id: 9,
    matchSetting_id: 1,
    match_day: "2016-10-16",
    start_time: "13:00:00",
    close_reg_time: "15:00:00",
    unit_price: 0.01,
    state: 1,
    style: "hold'em",
    remark: "16:00前半价，女士第一手免费",
    last_update: "2016-08-17 11:01:40",
    dailyMatchSerie: {
      dailyMatchSerie_id: 2,
      name: "单桌限时赛",
      organization_id: 22,
      organization: {
        casino_id: 25
      }
    },
    dailyMatchResult: null
  },
  {
    bigMatch_id: 144,
    matchSetting_id: 1,
    name: "No Limit Hold'em Single Table Satellite into $250 ",
    real_buyin: 60,
    rake_buyin: 0,
    match_day: "2016-09-08",
    open_time: "00:00:00",
    close_reg_time: "00:00:00",
    can_register: false,
    unit_price: 400.11,
    need_exchange: false,
    state: 0,
    style: "",
    remark: null,
    last_update: "2016-08-13 10:58:52",
    bigMatchSerie_id: 11,
    exchangeRate_id: 4,
    exchangeRate: {
      exchangeRate_id: 4,
      currency_name: "$",
      exchange_rate: 0,
      currency_code: "USD",
      last_update: "2016-08-13 09:31:49"
    }
  }
]


class DailyResultInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

    };

    this._renderDailyResultList = this._renderDailyResultList.bind(this);

  }

  componentWillMount() {
    const { casino, showDate } = this.props;
    this.props.actions.fetchDailyInfo(casino.casino_id, showDate);
  }

  _onPressDetailStruct(match, isStruct) {
    this.props.navigator.push({
      title: 'MatchSetting',
      component: MatchSetting,
      passProps: {
        match: match,
        isStruct: isStruct,
      },
    });
  }

  //跳转到比赛结果
  _onPressMatchResult(match) {
    this.props.navigator.push({
      component: MatchResult,
      passProps: {
        match: match,
      },
    });
  }

  _renderDailyResultList(item) {
    return (

      <View style={styles.detailItem}>

        <View style={styles.detailTitle}>
          <Text style={styles.detailTitleText}>{item.dailyMatchSerie ? item.dailyMatchSerie.name : item.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailText}>类型: {item.style}</Text>
          </View>


          <View style={styles.detailBlock}>
            <Text style={styles.detailText}>参赛条件: {item.unit_price} 积分</Text>
          </View>
        </View>



        <View style={styles.detailJoinAndOthers}>

          <TouchableOpacity style={styles.detailStruct} onPress={() => this._onPressDetailStruct(item, true)}>
            <Text style={styles.detailStructText}>比赛结构表</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.detailJoin} onPress={() => this._onPressMatchResult(item)}>
            <Text style={styles.detailJoinText}>赛事结果</Text>
          </TouchableOpacity>

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

        <NavBar name='昨日赛况' navigator={this.props.navigator}/>
        {/*{this._renderDailyResultList(mockData[0])}
        {this._renderDailyResultList(mockData[1])}*/}
        <ListView style={{backgroundColor: '#F2F2F2', height: Common.window.height - 67 - 44}}
          enableEmptySections = {true}
          dataSource={this.state.dataSource.cloneWithRows(dailyInfoList)}
          renderRow={this._renderDailyResultList}
          initialListSize={1}
        />
      </View>
    );
  }
}

const detailTitleColor = '#424242';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Common.colors.containerBgColor,
    backgroundColor: '#F2F2F2',
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
    // padding: 15,
    padding: 5,
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
    color: Common.colors.themeColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailPrice: {
    marginTop: 15,
    flexDirection: 'row',
  },


});


const mapStateToProps = (state) => ({
  DailyInfo: state.Daily.DailyInfo,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyResultInfo);
