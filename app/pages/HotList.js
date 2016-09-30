import Util from '../common/utils';
import Header from '../components/Header';
import Common from '../common/constants';
import HotIntroContainer from '../containers/HotIntroContainer';
import Loading from '../components/Loading';
import LoadMoreFooter from '../components/LoadMoreFooter';


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



let page = 1;
let isLoadMore = false;
let isLoading = true;


class HotList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

    };

    this._renderHotList = this._renderHotList.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchHots(page, isLoadMore,  isLoading);
    });


  }

  _onPressHotItem(hotMatch) {
    this.props.navigator.push({
      title: 'MatchIntro',
      component: HotIntroContainer,
      passProps: {
        hotMatch
      },
    });
  }


  _onScroll() {
    if (!isLoadMore) {
      isLoadMore = true;
    }
    // console.log('_onScroll');

  }

  // 下拉刷新
  _onRefresh() {
    page = 1;
    isLoadMore = false;

    this.props.actions.fetchHots(page, isLoadMore, isLoading);


  }

  // 上拉加载
  _onEndReach() {
    const { HotList } = this.props;

    // 如果只有一页，就不刷新
    if (HotList.count <= 5) {
      return;
    }
    console.log('page ' + page);
    if (isLoadMore) {

      page++;
      this.props.actions.fetchHots(page, isLoadMore, false);
      isLoadMore = false;
    }
  }

  //listView 底部
  _renderFooter() {
    const {
      HotList
    } = this.props;
    if (HotList.isLoadMore) {
      return <LoadMoreFooter />
    }
  }

  _renderHotList(hotMatch) {
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
    const { HotList } = this.props;
    let hotList = HotList.hotList;


    return (


      <View style={styles.container}>
        <Header
          title='热门推荐'
        />
        {HotList.isLoading ?
        <Loading /> :
        <ListView
          enableEmptySections = {true}
          dataSource={this.state.dataSource.cloneWithRows(hotList)}
          renderRow={this._renderHotList}
          initialListSize={1}
          enableEmptySections={true}
          onEndReached={() => this._onEndReach()}
          onEndReachedThreshold={10}
          onScroll={() => this._onScroll()}
          renderFooter={() => this._renderFooter()}


          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => this._onRefresh()}
              title="正在加载中……"
              tintColor="#ccc"
            />
          }
        />
        }

      </View>

    );
  }
}


const listPadding = 25;
const imageWidth = Common.window.width-listPadding * 2;
const imageHeight = 179/328 * (Common.window.width-listPadding * 2 );
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
    flex: 1,
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
export default HotList;
