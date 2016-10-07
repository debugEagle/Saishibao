import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../components/Loading';

import React, {Component} from 'react';
import PullRefreshScrollView from '../common/pullRefresh';
import {
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Navigator,
  Animated,
} from 'react-native';

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

      showAreasView: false,
      showToursView: false,
      showMonthsView: false,

      // 选择菜单高度
      selectContentViewHeights: 0,

      // 排序视图高度百分比值
      selectContentViewHeight: new Animated.Value(0),

      // 排序视图x值
      moveSelectContentViewHorizontal: new Animated.Value(0),

      // 遮盖层透明度
      coverViewOpacity: new Animated.Value(0)
    }
  }

  componentWillMount() {
    const { actions, ScheduleList } = this.props;
    const { selected } = ScheduleList
    actions.fetchAreaList();
    actions.fetchTourList();
    actions.fetchSchedule(selected.area, selected.tour, selected.month, {all: false, offset: 0, limit: 15})
  }

  componentDidMount() {

  }

  // 控制整个下拉菜单动画
  _handleSelectViewAnimationVertical() {
    const {ScheduleList, actions} = this.props;
    Animated.sequence([
      Animated.timing(this.state.selectContentViewHeight, {
        toValue: ScheduleList.showSelectContentView ? 0 : 1,
        duration: this.state.selectContentViewHeights
      }),
      // 遮盖层透明度
      Animated.timing(this.state.coverViewOpacity, {
        toValue: 1,
        duration: 1000
      })
    ]).start();
    // 改变排序视图状态
    actions.changeSelectContentShow();
  }

  // 地区选择菜单横向动画
  _handleAreasViewAnimation() {
    const {ScheduleList, actions} = this.props;
    this.setState({showToursView:false});
    this.setState({showMonthsView:false});
    this.setState({selectContentViewHeights: (Math.ceil(ScheduleList.schedule.areas.length / 3) * (30 + 10) + 10)});
    if (ScheduleList.showSelectContentView) {
      if (this.state.showAreasView) {
        this._handleSelectViewAnimationVertical();
      } else {
        Animated.parallel([
          Animated.timing(this.state.selectContentViewHeight, {
            toValue: 1,
            duration: 500
          }),
          Animated.timing(this.state.moveSelectContentViewHorizontal, {
            toValue: 0,
            duration: 500
          })
        ]).start();
      }
    } else {
      this.setState({moveSelectContentViewHorizontal: new Animated.Value(0)});
      this._handleSelectViewAnimationVertical();
    }
    this.setState({showAreasView:!this.state.showAreasView});
  }

  // 赛事选择菜单横向动画
  _handleToursViewAnimation() {
    const {ScheduleList, actions} = this.props;
    this.setState({showAreasView:false});
    this.setState({showMonthsView:false});
    this.setState({selectContentViewHeights: (Math.ceil(ScheduleList.schedule.tours.length / 3) * (30 + 10) + 10)});
    if (ScheduleList.showSelectContentView) {
      if (this.state.showToursView) {
        this._handleSelectViewAnimationVertical();
      } else {
        Animated.parallel([
          Animated.timing(this.state.selectContentViewHeight, {
            toValue: 1,
            duration: 500
          }),
          Animated.timing(this.state.moveSelectContentViewHorizontal, {
            toValue: 0.5,
            duration: 500
          })
        ]).start();
      }
    } else {
      this.setState({moveSelectContentViewHorizontal: new Animated.Value(0.5)});
      this._handleSelectViewAnimationVertical();
    }
    this.setState({showToursView:!this.state.showToursView});
  }

  // 月份选择菜单横向动画
  _handleMonthsViewAnimation() {
    const {ScheduleList, actions} = this.props;
    this.setState({showAreasView:false});
    this.setState({showToursView:false});
    this.setState({selectContentViewHeights: (Math.ceil(ScheduleList.schedule.months.length / 3) * (30 + 10) + 10)});
    if (ScheduleList.showSelectContentView) {
      if (this.state.showMonthsView) {
        this._handleSelectViewAnimationVertical();
      } else {
        Animated.parallel([
          Animated.timing(this.state.selectContentViewHeight, {
            toValue: 1,
            duration: 500
          }),
          Animated.timing(this.state.moveSelectContentViewHorizontal, {
            toValue: 1,
            duration: 500
          })
        ]).start();
      }
    } else {
      this.setState({moveSelectContentViewHorizontal: new Animated.Value(1)});
      this._handleSelectViewAnimationVertical();
    }
    this.setState({showMonthsView:!this.state.showMonthsView});
  }

  // 选择按钮栏
  _renderSelectView() {

    return (
      <View style={[styles.selectView,styles.withBorderBottom]}>
        <View style={[styles.selectViewItem,styles.withBorderRight]}>
          <TouchableOpacity
            style={styles.selectViewItemView}
            onPress={() => this._handleAreasViewAnimation()}>
            <Text style={styles.selectViewItemText}>选择地区</Text>
            <View style={styles.selectViewItemIcon}>
             <Icon color="#e0eaff" size={16} name= {this.state.showAreasView ? 'chevron-up' : 'chevron-down'}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.selectViewItem,styles.withBorderRight]}>
          <TouchableOpacity
            style={styles.selectViewItemView}
            onPress={() => this._handleToursViewAnimation()}>
            <Text style={styles.selectViewItemText}>选择赛事</Text>
            <View style={styles.selectViewItemIcon}>
             <Icon color="#e0eaff" size={16} name= {this.state.showToursView ? 'chevron-up' : 'chevron-down'}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.selectViewItem,styles.withBorderRight]}>
          <TouchableOpacity
            style={styles.selectViewItemView}
            onPress={() => this._handleMonthsViewAnimation()}>
            <Text style={styles.selectViewItemText}>选择时间</Text>
            <View style={styles.selectViewItemIcon}>
              <Icon color="#e0eaff" size={16} name= {this.state.showMonthsView ? 'chevron-up' : 'chevron-down'}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 下拉选择菜单
  _rendereSelectContentView() {
    const {ScheduleList, actions} = this.props;
    const selectedArea = ScheduleList.selected.area
    const selectedTour = ScheduleList.selected.tour
    const selectedMonth = ScheduleList.selected.month

    let viewHeight = this.state.selectContentViewHeight * ( Common.window.height - 84 );

    let selectedAreaStyle = selectedArea === '全部地区' ? styles.currentSelectItem : null
    let selectedTourStyle = selectedTour === 0 ? styles.currentSelectItem : null
    let selectContentViewStyles = [styles.selectContentView];
    selectContentViewStyles.push({
      left: this.state.moveSelectContentViewHorizontal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -Common.window.width * 2]
      }),
      height: this.state.selectContentViewHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.state.selectContentViewHeights]
      })
    });
    return (
      <Animated.View style={selectContentViewStyles}>
        <View style={[styles.selectContentItemView, styles.selectAreasView]}>
          <TouchableOpacity style={[styles.selectItem, selectedAreaStyle]} onPress={() => {
            this._handleSelectViewAnimationVertical();
            {actions.changeScheduleSelected('全部地区', selectedTour, selectedMonth)}
            {actions.fetchSchedule('全部地区', selectedTour, selectedMonth, {new: true})};
          }}>
            <Text>全部地区</Text>
          </TouchableOpacity>
          {ScheduleList.schedule.areas.map((area, i) => {
            let selectedStyle = selectedArea === area.country ? styles.currentSelectItem : null;
            return (
              <TouchableOpacity key={i} style={[styles.area,styles.selectItem,selectedStyle]} onPress={() => {
                this._handleSelectViewAnimationVertical();
                {actions.changeScheduleSelected(area.country, selectedTour, selectedMonth)}
                {actions.fetchSchedule(area.country, selectedTour, selectedMonth, {new: true})};
              }}>
                <Text>{area.country}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[styles.selectContentItemView, styles.selectToursView]}>
          <TouchableOpacity style={[styles.selectItem, selectedTourStyle]} onPress={() => {
            this._handleSelectViewAnimationVertical();
            {actions.changeScheduleSelected(selectedArea, 0, selectedMonth)}
            {actions.fetchSchedule(selectedArea, 0, selectedMonth, {new: true})};
          }}>
            <Text>全部赛事</Text>
          </TouchableOpacity>
          {ScheduleList.schedule.tours.map((tour, i) => {
            let selectedStyle = selectedTour === tour.bigMatchTour_id ? styles.currentSelectItem : null;
            return (
              <TouchableOpacity key={i} style={[styles.tour,styles.selectItem, selectedStyle]} onPress={() => {
                this._handleSelectViewAnimationVertical();
                {actions.changeScheduleSelected(selectedArea, tour.bigMatchTour_id, selectedMonth)}
                {actions.fetchSchedule(selectedArea, tour.bigMatchTour_id, selectedMonth, {new: true})};
              }}>
                <Text>{tour.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[styles.selectContentItemView, styles.selectMonthsView]}>
          {ScheduleList.schedule.months.map((month, i) => {
            let selectedStyle = selectedMonth === month ? styles.currentSelectItem : null;
            return (
              <TouchableOpacity key={i} style={[styles.selectItem, selectedStyle]} onPress={() => {
                this._handleSelectViewAnimationVertical();
                {actions.changeScheduleSelected(selectedArea, selectedTour, month)}
                {actions.fetchSchedule(selectedArea, selectedTour, month, {new: true})};
              }}>
                <Text>{ i === 7 ? '当前月份' : month.substring(0,4) + '年' + month.substring(4) + '月' }</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    )
  }

  // 覆盖层
  _renderCoverView() {

    return (
      <TouchableOpacity
        style={{position: 'absolute',top: 84,zIndex:8}}
        activeOpacity={1}
        onPress={() => this._handleSelectViewAnimationVertical()}>

        <Animated.View style={{
          width: Common.window.width,
          height: Common.window.height - 84,
          backgroundColor: 'rgba(131, 131, 131, 0.3)',
          opacity: this.state.coverViewOpacity}}>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  // 赛事列表
  _renderListView(matches) {
    const { ScheduleList } = this.props;
    if (matches.length === 0) {
      return null
    }
    const viewHeight = Common.window.height - 132
    const listHeight = matches.length * 70
    const scrollHeight = listHeight - viewHeight;

    return (
      <ListView
        renderScrollComponent={
          () =>
            <PullRefreshScrollView
              onRefresh={()=>this._onRefresh()}
              onLoadmore={()=>this._onLoadmore()}
              viewHeight={viewHeight}
              listHeight={listHeight}
              scrollHeight={scrollHeight}
              status={ScheduleList.status}/>}
        dataSource={this.state.dataSource.cloneWithRows(matches)}
        renderRow={this._renderRow}
        initialListSize={15}
        style={styles.matchListView}
        enableEmptySections={true}/>
    );
  }

  // 下拉刷新事件
  _onRefresh() {
    const { actions, ScheduleList } = this.props;
    const { selected } = ScheduleList
    actions.fetchSchedule(selected.area, selected.tour, selected.month, {new: true})
  }

  // 上拉加载更多
  _onLoadmore() {
    const { actions, ScheduleList } = this.props;
    const { selected } = ScheduleList
    const obj = {
      start: false,
      offset: ScheduleList.schedule.matches.length,
      limit: 10
    }
    actions.fetchSchedule(selected.area, selected.tour, selected.month, obj)
  }

  // 赛事
  _renderRow(match) {
    const title = match.name
    const city = match.organization.casino.address.city.city
    const country = match.organization.casino.address.city.country.country
    const image_url = match.organization.casino.address.city.country.image_url
    let start_date = match.start_date.substring(5,7) + '.' + match.start_date.substring(8)
    let end_date = match.end_date.substring(5,7) + '.' + match.end_date.substring(8)
    let match_date = start_date + '-' + end_date
    return (
      <View style={[styles.matchItemView, styles.withBorderBottom]}>
        <View style={styles.matchImageView}>
          <Image style={styles.matchImage} source={{uri: image_url}}/>
        </View>
        <View style={styles.matchInfoView}>
          <View style={styles.matchTopicView}>
            <Text numberOfLines={1}>
              {title}
            </Text>
          </View>
          <View style={styles.matchDetailView}>
            <View style={styles.matchArea}>
              <Text style={{color:'gray'}}>
              {country}{' '}{city}
              </Text>
            </View>
            <View style={styles.matchDate}>
              <Text>
              {match_date}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chevronRight}>
          {/* <Icon color="#e0eaff" size={16} name="chevron-right"/> */}
        </View>
      </View>
    )
  }

  render() {
    const {ScheduleList} = this.props;

    return (
      <View style={styles.container}>
        <Header title='赛事日历'/>
        {this._renderSelectView()}
        {this._rendereSelectContentView()}
        {ScheduleList.showSelectContentView ? this._renderCoverView() : null}
        {ScheduleList.schedule.matches.length === 0 && (ScheduleList.status === 'refreshing' || ScheduleList.status === 'loading') ? <Loading /> : this._renderListView(ScheduleList.schedule.matches)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Common.window.height-68,
    backgroundColor: Common.colors.containerBgColor
  },
  selectView: {
    height: 40,
    paddingVertical: 8,
    flexDirection: 'row'
  },
  selectViewItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectViewItemView: {
    flexDirection: 'row'
  },
  selectViewItemIcon: {
    marginLeft: 10,
  },
  withBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#e0eaff'
  },
  withBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
  selectContentView: {
    position: 'absolute',
    width: Common.window.width * 3,
    left: 0,
    height: 0,
    flexDirection: 'row',
    overflow: 'hidden',
    zIndex: 999
  },
  selectContentItemView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingTop: 10
  },
  selectItem: {
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
  currentSelectItem: {
    borderWidth: 1,
    borderColor: Common.colors.themeColor,
  },
  matchListView: {
    flex: 1,
    zIndex: 5
  },
  matchItemView: {
    height: 70,
    flexDirection: 'row'
  },
  matchImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchImage: {
    height: 44,
    width: 66,
    resizeMode: Image.resizeMode.cover,
    borderRadius: 4
  },
  matchInfoView: {
    flex: 3,
    flexDirection: 'column',
    marginLeft: 10,
    marginVertical: 13,
    justifyContent: 'space-between'
  },
  matchTopicView: {
    flex: 1
  },
  matchDetailView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  chevronRight: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default ScheduleList
