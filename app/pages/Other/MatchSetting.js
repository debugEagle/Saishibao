import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import Util from '../../common/utils';
import NavBar from '../../components/NavBar';
import Constants from '../../common/constants';
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
} from 'react-native';



class MatchSetting extends Component {

  constructor(props) {
    super(props);

  }


  componentWillMount() {
    this.props.actions.fetchMatchSetting();
  }

  componentWillUnmount() {
    this.props.actions.resetMatchSetting();

  }



  _renderTitleRow(item1, item2, item3, item4) {
    return (
      <View style={styles.settingTitle}>
        {this._renderTitleItem(item1)}
        {this._renderTitleItem(item2)}
        {this._renderTitleItem(item3)}
        {this._renderTitleItem(item4)}

      </View>
    );
  }

  _renderTitleItem(item) {
    return (
    <View style={styles.settingTitleBlock}>
      <Text style={styles.settingTitleText}>{item}</Text>
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

  _renderItemRow({  level, sb, bb, ante, appText }) {
    return (
      <View>
        <View style={styles.settingItem}>
          {this._renderItem(level)}
          {this._renderItem(sb)}
          {this._renderItem(bb)}

          <View style={styles.settingItemBlock_Last}>
            <Text style={styles.settingText}>{ante}</Text>
          </View>
        </View>
        {appText ?
          <View style={styles.settingInfoRow}>
            <Text style={styles.settingInfoRowText}>{appText}</Text>
          </View>
        :
        <View></View>}
      </View>
    );
  }

  _renderInfoRow(matchSetting) {
    const { bigMatch } = this.props;

    let match_day = new Date(bigMatch.match_day)
    let month = match_day.getMonth() + 1;
    let day = match_day.getDate();


    return (
      <View style={styles.settingItem}>
        <View style={styles.settingItemBlock}>
          <Text style={styles.settingText}>{month}月{day}日</Text>
        </View>
        {bigMatch.open_time? this._renderItem(bigMatch.open_time): this._renderItem(bigMatch.start_time)}
        <View style={styles.settingItemBlock}>
          <Text style={styles.settingText}>{matchSetting.blindTime}分</Text>
        </View>
        {this._renderItem(matchSetting.chip)}
      </View>
    );
  }
  _renderSettingBonusRow({  ranking, bonus, remark}) {
    return (
      <View>
        <View style={styles.settingItem}>
          {this._renderItem(ranking)}
          {this._renderItem(bonus)}
          {this._renderItem(remark)}


        </View>

      </View>
    );
  }




  render() {

    const { MatchSetting } = this.props;
    let matchSetting = MatchSetting.matchSetting;
    const isStruct = this.props.isStruct;

    let title = isStruct? '比赛结构表': '奖金结构表';

    return (
      <View style={styles.container}>
        <NavBar name={title} navigator={this.props.navigator}/>
        {MatchSetting.isLoading ?

          <Loading /> :

          <ScrollView style={styles.scrollContainer}>
            {isStruct
              ?
                <View>
                  {this._renderTitleRow('赛事日期', '开始时间', '涨盲时间', '初始筹码')}
                  {this._renderInfoRow(matchSetting)}
                  {this._renderTitleRow('级别', '小盲', '大盲', '前注')}


                  {matchSetting.items.map((item, i) => {
                    return (<View key={i}>{this._renderItemRow(item)}</View>);
                  })}
                </View>:
              <View>
                {/*<View style={styles.settingBonusRow}>
                  <Text style={styles.settingInfoRowText}>奖金结构表</Text>
                </View>*/}

                {matchSetting.bonuses.map((item, i) => {
                  return (<View key={i}>{this._renderSettingBonusRow(item)}</View>);
            })}
          </View>
        }

        </ScrollView>
      }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#ffffff',
    padding: 3,
  },
  settingTitle: {
    flexDirection: 'row',
    paddingTop :10,
    paddingBottom :10,
  },
  settingItem: {
    flexDirection: 'row',
    height: 37,
  },
  settingItemBlock: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0eaff',

  },
  settingItemBlock_Last: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0eaff',

  },


  settingTitleBlock: {
    flex:1,
    marginTop: 2,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  settingText: {
    color: '#424242',
    fontSize: 14,
    // fontWeight: 'bold',
  },
  settingTitleText: {
    color: '#424242',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingInfoRow: {
    height: 40,
    marginBottom: 2,
    borderTopWidth: 2,
    borderColor: '#e0eaff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingBonusRow: {
    height: 40,
    marginTop: 2,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfoRowText: {
    color: '#424242',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state) => ({
  MatchSetting: state.Other.MatchSetting
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchSetting);
