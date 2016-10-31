import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'


import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/Loading';
import Toast, {DURATION} from 'react-native-easy-toast';
import Text from '../../components/Text';




import React, { Component } from 'react';
import {
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


class MatchResult extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const match = this.props.match;
    // console.log('match ' + JSON.stringify(match));
    let match_id;
    let isDailyMatch = match.dailyMatch_id? true : false;

    if (isDailyMatch) {
      match_id = match.dailyMatch_id;
    }
    else {
      match_id = match.bigMatch_id;
    }

    // console.log('isDailyMatch ' + isDailyMatch);
    // console.log('match_id ' + match_id);
    this.props.actions.fetchMatchResult(
      isDailyMatch,
      match_id,
      () => this._fetchSuccess(),
      (msg) => this._fetchFailed(msg),




    );
  }

  _fetchSuccess() {

  }


  _fetchFailed(msg) {
    this.refs.toast.show(msg);

  }
  _renderTitleRow(item1, item2, item3, item4 ) {
    return (
      <View style={styles.settingTitle}>
        <View style={[styles.settingTitleBlock, {flex: 0.5}]}>
          <Text style={styles.settingTitleText}>{item1}</Text>
        </View>
        <View style={[styles.settingTitleBlock, {flex: 1}]}>
          <Text style={styles.settingTitleText}>{item2}</Text>
        </View>
        <View style={[styles.settingTitleBlock, {flex: 1}]}>
          <Text style={styles.settingTitleText}>{item3}</Text>
        </View>
        <View style={[styles.settingTitleBlock, {flex: 1.5}]}>
          <Text style={styles.settingTitleText}>{item4}</Text>
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

  _renderItemRow( rank, name, bonus, reamark ) {
    return (
      <View style={styles.ItemRow}>
        <View style={[styles.settingItemBlock, {flex: 0.5}]}>
          <Text style={styles.settingText}>{rank}</Text>
        </View>
        <View style={[styles.settingItemBlock, {flex: 1}]}>
          <Text style={styles.settingText}>{name}</Text>
        </View>
        <View style={[styles.settingItemBlock, {flex: 1}]}>
          <Text style={styles.settingText}>{bonus}</Text>
        </View>
        <View style={[styles.settingItemBlock, {flex: 1.5}]}>
          <Text style={styles.settingText}>{reamark}</Text>
        </View>

      </View>
    );
  }
  //
  // _renderMatchResut() {
  //   const { MatchResult } = this.props;
  //   let matchResult = MatchResult.matchResult;
  //   if (matchResult.items.length>0) {
  //     matchResult.items.map((item, i) => {
  //       let renderRet =  (
  //       <View key={i}>
  //         {this._renderItemRow(item.rank, item.rank, item.bonus)}
  //       </View>);
  //   }
  // }


  render() {
    const { MatchResult } = this.props;
    let matchResult = MatchResult.matchResult;


    return (
      <View style={styles.container}>
        <NavBar name='赛事结果' navigator={this.props.navigator}/>
        {MatchResult.isLoading ?
          <Loading />:
        <View style={styles.itemView}>

          {this._renderTitleRow('名次', '姓名(昵称)', '奖励', '说明')}
          {matchResult.items? matchResult.items.map((item, i) => {
            return (<View key={i}>{this._renderItemRow(item.rank, item.rank, item.bonus)}</View>);
          }): null}


        </View>
        }
        <Toast ref="toast" position='top'/>

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
    flex:1,
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

const mapStateToProps = (state) => ({
  MatchResult: state.Other.MatchResult
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchResult);
