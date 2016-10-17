import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreator from '../../actions'

import Util from '../../common/utils';
import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import HotIntro from './HotIntro';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import PullRefreshScrollView from '../../common/pullRefresh';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  AlertIOS,
  RefreshControl,
  InteractionManager,
} from 'react-native';

class HotList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    };

    this._renderRow = this._renderRow.bind(this);
  }

  componentWillMount(){
    this.props.actions.fetchHots({start: true});
    // this.props.actions.startUserLoginWithToken();
  }

  _onPressHotItem(hotMatch) {

    this.props.navigator.push({
      title: 'MatchIntro',
      component: HotIntro,
      passProps: {
        hotMatch,
      },
    });
  }

  _renderListView() {
    const { HotList } = this.props;
    let hotList = HotList.hotList;
    const listHeight = hotList.length * listItemHeight;
    const viewHeight = Common.window.height - 112;
    return (
      <ListView
        enableEmptySections = {true}
        dataSource={this.state.dataSource.cloneWithRows(hotList)}
        renderRow={this._renderRow}
        renderScrollComponent={
          (props) =>
            <PullRefreshScrollView
              onRefresh={()=>this._onRefresh()}
              onLoadmore={()=>this._onLoadmore()}
              listHeight={listHeight}
              viewHeight={viewHeight}
              status={HotList.status}/>}
      />
    )
  }

  _onRefresh(){
    this.props.actions.fetchHots({start: true});
  }

  _onLoadmore(){
    this.props.actions.fetchHots({start: false, offset: this.props.HotList.hotList.length, limit: 5});
  }

  _renderRow(hotMatch) {
    return (
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
      onPress={() => this._onPressHotItem(hotMatch)}>
        <View style={styles.listItem}>
          <View>
            <Image style={styles.itemImage} source={{uri:hotMatch.url}}>
              <View style={styles.date}>
                <Text style={styles.dateText}>{hotMatch.startDate}-{hotMatch.endDate}</Text>
              </View>
            </Image>
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>
                {hotMatch.name}
              </Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>
                {hotMatch.country} {hotMatch.city}
              </Text>
            </View>
            <View style={styles.separate}>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }



  render() {

    return (
      <View style={styles.container}>
        <NavBar name='热门推荐' navigator={this.props.navigator} />
        {this._renderListView()}
      </View>
    );
  }
}


const listPadding = 25;
const imageWidth = Common.window.width-listPadding * 2;
const imageHeight = 179/328 * (Common.window.width-listPadding * 2 );
const listItemHeight = imageHeight + 80
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor
  },
  itemImage: {
    width: imageWidth,
    height: imageHeight,

  },
  listItem: {
    paddingLeft: listPadding,
    paddingRight: listPadding,
    paddingTop: 20,
    alignItems: 'center',
    width: Common.window.width ,
    height: listItemHeight,
  },

  titleText: {
    lineHeight: 23,
    fontSize: 16,

  },
  matchArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingLeft: 5,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingRight: 5,
  },
  titleImage: {
    width: 23,
    height: 23,
  },
  titleTextName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleRow: {
    marginTop: 3,
    height: 23,
    justifyContent: 'center',
  },
  dateText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',


  },
  date: {
    position: 'absolute',
    top: imageHeight - 35,
    backgroundColor: '#ff9326',
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'

  },
  locationRow: {
    marginTop: 3,
    height: 19,
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 13,

  },
  separate: {
    marginTop: 15,
    marginBottom: 15,
    width: imageWidth,
    height: 1,
    backgroundColor: '#e0eaff',
  }
});

const mapStateToProps = (state) => ({
  HotList: state.Hot.HotList,
  UserLogin: state.User.UserLogin,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HotList);
