import Util from '../common/utils';
import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import CasinoIntro from './CasinoIntro';
import PullRefreshScrollView from '../common/pullRefresh';

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
  RefreshControl,
  ScrollView,
  Animated,
  Easing
} from 'react-native';


class DailyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

      cityViewHeight: 500,
      cityViewMarginTop: -300,

      // 排序视图Y值
      moveCityView: new Animated.Value(0),

      // 遮盖层透明度
      coverViewOpacity: new Animated.Value(0)
    };

    this._onPressIntroBtn = this._onPressIntroBtn.bind(this)
  }

  componentWillMount() {
    const { actions, DailyList } = this.props;
    actions.fetchCities();
    actions.fetchDailies(DailyList.currentCity,{start: true});
  }

  componentDidUpdate() {
    const { CityList } = this.props;
    this.state.cityViewHeight = (CityList.cities.length !== 0) ? ((Math.ceil(CityList.cities.length / 3) * (30 + 10) + 10)) : this.state.cityViewHeight;
  }

  componentDidMount() {
    const { actions, DailyList } = this.props;
    this.state.cityViewMarginTop = 44;
  }

  _onPressIntroBtn(casino) {
    this.props.navigator.push({
      component: CasinoIntro,
      passProps: {
        casino
      }
    });

  }

  _renderCityBtn() {
    const iconName = this.props.DailyList.showCityView ? 'chevron-up' : 'chevron-down';
    return (
      <TouchableOpacity style={styles.chooseCity} onPress={() => this._handleCityViewAnimation()}>
        <View style={styles.chooseCityView}>
          <View style={styles.chooseCityTextView}>
            <Text style={styles.chooseCityText}>{this.props.DailyList.currentCity}</Text>
          </View>
          <View style={styles.chooseCityIconView}>
            <Icon color="white" size={16} name={iconName}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // 排序View动画
  _handleCityViewAnimation() {
    const {DailyList, actions} = this.props;
    Animated.sequence([
      Animated.timing(this.state.moveCityView, {
        toValue: DailyList.showCityView ? 0 : 1,
        duration: 500
      }),

      // 遮盖层透明度
      Animated.timing(this.state.coverViewOpacity, {
        toValue: 1,
        duration: 1000
      })
    ]).start();
    // 改变排序视图状态
    actions.changeDailyCityShowStatus();
  }

  _renderCityView() {
    const {DailyList, actions} = this.props;
    let cityViewHeight = this.state.cityViewHeight;
    let cityViewStyle = [styles.cityView,{marginTop: this.state.cityViewMarginTop}];
    cityViewStyle.push({
      top: this.state.moveCityView.interpolate({
        inputRange: [0, 1],
        outputRange: [-cityViewHeight - 45,0]
      })
    })

    return (
      <Animated.View style={cityViewStyle}>
        {this.props.CityList.cities.map((oCity, i) => {
          return (
            <TouchableOpacity key={i} style={styles.city} onPress={() => {
              this._handleCityViewAnimation();
              {actions.fetchDailies(oCity.city,{start: true})};
            }}>
              <Text>{oCity.city}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    )
  }

  _renderCoverView() {

    return (
      <TouchableOpacity
        style={{position: 'absolute',top: 44}}
        activeOpacity={1}
        onPress={() => this._handleCityViewAnimation()}>

        <Animated.View style={{
          width: Common.window.width,
          height: Common.window.height - 44,
          backgroundColor: 'rgba(131, 131, 131, 0.3)',
          opacity: this.state.coverViewOpacity}}>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  _renderListView(casinos) {
    const { DailyList } = this.props;
    if (casinos.length === 0) {
      return null
    }

    return (
      <ListView
        renderScrollComponent={
          (props) =>
            <PullRefreshScrollView
              onRefresh={()=>this._onRefresh()}
              onLoadmore={()=>this._onLoadmore()}
              scrollHeight={(casinos.length * 150) - (Common.window.height - 92)}
              status={DailyList.status}/>}
        dataSource={this.state.dataSource.cloneWithRows(casinos)}
        renderRow={this._renderRow}
        style={styles.listView}
        enableEmptySections={true} />
      );
  }

  _onRefresh() {
    const { DailyList,actions } = this.props
    actions.fetchDailies(DailyList.currentCity,{start: true});
  }

  _onLoadmore() {
    const { DailyList,actions } = this.props
    actions.fetchDailies(DailyList.currentCity,{start: false, offset: DailyList.casinos.length, limit: 10});
  }

  _renderRow(item) {

    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.itemImgView}>
            <Image style={styles.itemImg} source={{uri: item.logo_url}}/>
          </View>
          <View style={styles.itemClubNameView}>
            <Text style={styles.itemClubName}>
              {item.casino}
            </Text>
          </View>
        </View>
        <View style={styles.itemRight}>
          <View style={[styles.itemRightTop, styles.withBorderBottom]}>
            <TouchableOpacity
              style={[styles.itemRightItem, styles.withBorderRight]}
              onPress={() => this._onPressIntroBtn(item)}>
              <Text style={{fontSize: 16}}>场馆介绍</Text>
            </TouchableOpacity>
            <View style={[styles.itemRightItem, {alignItems: 'center'}]}>
              <Text style={{fontSize: 13,color: '#787878'}}>
                昨日赛况
              </Text>
            </View>
          </View>
          <View style={styles.itemRightBottom}>
            <View style={[styles.itemRightItem,styles.withBorderRight, {alignItems: 'center'}]}>
              <Text style={{fontSize: 13,color: '#787878'}}>明日预告</Text>
            </View>
            <View style={[styles.itemRightItem, {alignItems: 'flex-end'}]}>
              <Text style={{fontSize: 16}}>
                今日赛事
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const {DailyList} = this.props;
    let casinos = DailyList.casinos;

    return (
      <View style={styles.container}>
        <Header title='俱乐部'/>
        {this._renderCityBtn()}
        {this._renderListView(casinos)}
        {DailyList.showCityView ? this._renderCoverView() : null}
        {this._renderCityView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Common.window.height-64,
    backgroundColor: Common.colors.containerBgColor
  },
  chooseCity: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 999,
    height: 25,
    width: 60,
  },
  chooseCityView: {
    height: 25,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chooseCityTextView: {
    flex: 2,
    backgroundColor: Common.colors.themeColor
  },
  chooseCityText: {
    color: '#ffffff',
    fontSize: 16,
  },
  chooseCityIconView: {
    flex: 1,
    backgroundColor: Common.colors.themeColor

  },
  city: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (Common.window.width - 4 * 10) / 3,
    height: 30,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 10
  },
  cityView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    width: Common.window.width,
    paddingTop: 10,
    zIndex: 9
  },
  withBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#e0eaff'
  },
  withBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
  listView: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10
  },
  itemImgView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImg: {
    height: 100,
    width: 100,
    resizeMode: Image.resizeMode.contain
  },
  itemClubNameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemClubName: {

  },
  itemRight: {
    flex: 1.5,
    marginHorizontal: 15,
  },
  itemRightTop: {
    flex: 1,
    flexDirection: 'row'
  },
  itemRightBottom: {
    flex: 1,
    flexDirection: 'row'
  },
  itemRightItem: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default DailyList;
