'use strict';

import React, {Component} from 'react';
import ScrollableMixin from './ScrollableMixin';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    Easing,
    ScrollView,
    ActivityIndicator
} from 'react-native';

// 外部引用需要提供：
// onRefresh(): 上拉刷新所调用方法
// onLoadmore(): 下拉加载所调用方法
// viewHeight: 可视区域大小
// listviewHeight: listview总长度
// status: 网络获取数据状态，必须提供对应四个：
//          'loading': 上拉加载中
//          'refreshing': 全新加载中，即初次加载数据过程中
//          'loaded': 加载完本次数据，还可以进行上拉加载
//          'finished': 所有数据加载完成

export default class PullRefreshScrollView extends Component {
  constructor(props) {
      super(props);
      this.gorefreshText = props.gorefreshText;
      this.refreshedText = props.refreshedText;
      this.refreshingText = props.refreshingText;
      this.refreshText = props.refreshText;
      this.loadedText = props.loadedText;
      this.loadingText = props.loadingText;
      this.loadText = props.loadText;
      this.state = {
        plTitle: this.loadText,
        plState: 0,
        plLoading: false,
        prTitle: this.refreshText,
        prState: 0,
        prLoading: false,
        ArrowDeg: new Animated.Value(0)
      };
      this.refreshTimer = false
      this.loadmoreTimer = false
      this.arrowImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';
      this.dragFlag = false; //scrollview是否处于拖动状态的标志
  }

  onScroll(e){
    // y表示scroll滑动相对父级顶部的位移
    const y = e.nativeEvent.contentOffset.y;
    if (this.dragFlag) {
      if (y <= -70) {
        this.setState({
          prTitle:this.gorefreshText,
          prState:1
        });
        Animated.timing(this.state.ArrowDeg, {
              toValue: 1,
              duration: 100,
              easing: Easing.inOut(Easing.quad)
          }).start();
      // scrollHeight 表示本scroll可以正常滑动的高度， 50表示到底部后继续上拉的距离
      } else if (y >= (this.props.listHeight-this.props.viewHeight) + 50 && this.props.status !== 'finished') {
        this.setState({
          plState:1
        });
        Animated.timing(this.state.ArrowDeg, {
              toValue: 1,
              duration: 100,
              easing: Easing.inOut(Easing.quad)
        }).start();
      } else{
        if (this.props.status === 'finished') {
          this.setState({
            plTitle: this.loadedText,
          });
        }
        this.setState({
          prState: 0,
          plState: 0,
        });
        Animated.timing(this.state.ArrowDeg, {
              toValue: 0,
              duration: 100,
              easing: Easing.inOut(Easing.quad)
          }).start();
      }
    }
    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
  }

  // 手指未离开
  onScrollBeginDrag(){
    this.dragFlag = true;
    if (this.props.onScrollBeginDrag) {
      this.props.onScrollBeginDrag();
    }
  }

  // 手指离开
  onScrollEndDrag(){
    const { status } = this.props;
    this.dragFlag = false;
    if (this.state.prState === 1) {
      // 回到待收起状态
      this.scrollView.scrollTo({x:0,y:-40,animated:true});
      this.setState({
        prTitle:this.refreshingText,
        prLoading: true,
        ArrowDeg:new Animated.Value(0),
      });
      // 触发外部的下拉刷新方法
      if (this.props.onRefresh && status !== 'refreshing' && status !== 'loading' && !this.refreshTimer) {
        this.refreshTimer = true;
        this.props.onRefresh(this);
        // 定时查询是否接收完数据
        this.timer1 = setInterval(() => {
          if (status === 'loaded' || status === 'finished') {
            this.onRefreshEnd();
            clearInterval(this.timer1);
          }
        }, 2000);
      }
    }
    if (this.state.plState === 1) {
      this.scrollView.scrollTo({x:0,y:((this.props.listHeight-this.props.viewHeight) + 40),animated:true});
      this.setState({
        plTitle: this.loadingText,
        plLoading: true,
        ArrowDeg: new Animated.Value(0),
      });
      // 触发外部的上拉加载方法
      if (this.props.onLoadmore && this.props.status !== 'refreshing' && this.props.status !== 'loading' && !this.loadmoreTimer) {
        this.loadmoreTimer = true;
        this.props.onLoadmore(this);
        this.timer2 = setInterval(() => {
          if (this.props.status === 'loaded' || this.props.status === 'finished') {
            this.onLoadmoreEnd(this.props.status);
            clearInterval(this.timer2);
          }
        }, 1000);
      }
    }
  }

  // 上拉刷新结束时
  onRefreshEnd() {
    const plTitle = this.props.status === 'finished' ? this.loadedText : this.loadText;
    this.refreshTimer = false;
    this.setState({
      prTitle: this.refreshedText,
      prLoading: false,
      plTitle: plTitle
    });
    this.timer3 = setTimeout(()=>{
      this.scrollView.scrollTo({x:0,y:0,animated:true});
      this.timer4 = setTimeout(() => {
        this.setState({
          prTitle: this.refreshText
        })
        clearTimeout(this.timer4)
      },1000)
      clearTimeout(this.timer3);
    },500)
  }

  // 加载更多结束时
  onLoadmoreEnd(status) {
    this.loadmoreTimer = false;
    const text = status === 'loaded' ? this.loadtext : this.loadedText
    this.setState({
      plTitle: text,
      plLoading: false,
    })
  }

  // 渲染拉动提示， top: true => 顶部下拉刷新, false => 尾部上拉加载
  renderIndicatorContent(top){
    let jsxarr = [];
    let _default = {
      outputRange: ['0deg', '-180deg'],
      style: styles.pullRefresh,
      title: this.state.prTitle,
      loading: this.state.prLoading
    }

    if(!top) {
      _default.outputRange = ['-180deg', '0deg'];
      _default.style = [styles.pullLoadmore];
      if ((this.props.listHeight-this.props.viewHeight) < 0) {
        _default.style.push({top: this.props.viewHeight})
      }
      _default.title = this.state.plTitle;
      _default.loading = this.state.plLoading;
    }

    this.transform = [{rotate:this.state.ArrowDeg.interpolate({
                      inputRange: [0,1],
                      outputRange: _default.outputRange
                  })}];
    // 加载中
    if (_default.loading) {
      jsxarr.push(<ActivityIndicator style={styles.indicatorStyle} animated={true}/>);
    }
    // 加载成功
    else if (_default.title === this.refreshedText || _default.title === this.loadedText) {
      jsxarr.push(<View style={styles.indicatorStyle}><Icon color="#ccc" size={16} name={'check'}/></View>);
    }
    // 没有加载
    else{
      jsxarr.push(<Animated.Image style={[styles.arrowStyle,{ transform:this.transform }]} resizeMode={'contain'} source={{uri: this.arrowImg}}/>);
    }

    jsxarr.push(<Text style={styles.pState}>{_default.title}</Text>)
    return (
      <View style={_default.style}>
        <View style={styles.indicatorContent}>
          {jsxarr.map((item,index)=>{
            return <View key={index}>{item}</View>
          })}
        </View>
      </View>
    );
  }


  getScrollResponder() {
    return this.scrollView.getScrollResponder();
  }

  setNativeProps(props) {
    this.scrollView.setNativeProps(props);
  }

  render() {

    return React.cloneElement(
      <ScrollView
        ref={(scrollView) => this.scrollView = scrollView}
        {...this.props}
        scrollEventThrottle={16}
        onScrollEndDrag={()=>this.onScrollEndDrag()}
        onScrollBeginDrag={()=>this.onScrollBeginDrag()}
        onScroll={(e)=>this.onScroll(e)}>

        {this.renderIndicatorContent(true)}
        {this.props.children}
        {this.renderIndicatorContent(false)}
      </ScrollView>, {
        ref: component => {
        this.scrollView = component;
      },
    });
  }
}

const styles = StyleSheet.create({
    pullRefresh:{
      position:'absolute',
      top:-69,
      left:0,
      right:0,
      height:70,
      backgroundColor: Common.colors.containerBgColor,
      alignItems:'center',
      justifyContent:'flex-end'
    },
    pullLoadmore:{
      position:'absolute',
      bottom:-69,
      left:0,
      right:0,
      height:70,
      backgroundColor: Common.colors.containerBgColor,
      alignItems:'center',
      justifyContent:'flex-start'
    },
    pState:{
      marginBottom:4,
      fontSize:14,
      color: '#ccc'
    },
    indicatorContent:{
      flexDirection:'row',
      marginBottom:5
    },
    arrowStyle: {
      position:'absolute',
      width:16,
      height:23,
      left:-40,
      top:-4,
    },
    indicatorStyle: {
      position:'absolute',
      left:-40,
      top:-1,
      width:16,
      height:16
    }
});


PullRefreshScrollView.defaultProps = {
    gorefreshText: '释放立即刷新',
    refreshedText: '成功刷新数据',
    refreshingText: '刷新数据中..',
    refreshText:'下拉进行刷新',
    loadedText: '全部加载完毕',
    loadingText: '加载中..',
    loadText: '上拉加载更多',
    onRefresh: '',
    onLoadmore: '',
};
Object.assign(PullRefreshScrollView.prototype, ScrollableMixin);
